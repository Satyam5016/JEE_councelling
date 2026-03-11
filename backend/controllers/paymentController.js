import crypto from 'crypto';
import Razorpay from 'razorpay';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import { inngest } from '../inngest/client.js';

// Lazy Razorpay initialization to prevent crash if keys are missing
let razorpay;
const getRazorpay = () => {
    if (!razorpay) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.warn('⚠️ Razorpay credentials missing. Payment features will fail.');
            return null;
        }
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpay;
};

// Plan pricing (in paise — Razorpay uses smallest currency unit)
const PLAN_PRICES = {
    basic: 100,         // ₹1
    elite: 99900,       // ₹999
    premium: 49900,     // ₹499
    doc_verif: 199900,  // ₹1,999
    admission: 249900, // ₹2,499
    branch: 149900,    // ₹1,499
    hostel: 99900      // ₹999
};

/**
 * Create a Razorpay order for a subscription plan.
 *
 * POST /api/payment/create-order
 * Body: { plan }
 */
export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body;

        if (!plan || !PLAN_PRICES[plan]) {
            return res.status(400).json({
                success: false,
                message: 'Invalid plan selected.',
            });
        }

        if (!req.dbUser) {
            return res.status(403).json({
                success: false,
                message: 'User profile not found. Please sync your account first.',
            });
        }

        const rzp = getRazorpay();
        if (!rzp) {
            return res.status(500).json({
                success: false,
                message: 'Payment system is currently unavailable.',
            });
        }

        const options = {
            amount: PLAN_PRICES[plan],
            currency: 'INR',
            receipt: `rcpt_${req.dbUser._id.toString().slice(-10)}_${Date.now().toString().slice(-10)}`,
            notes: {
                userId: req.dbUser._id.toString(),
                plan,
            },
        };

        console.log(`[Payment] Creating order for plan: ${plan}, userId: ${req.dbUser._id}`);
        const order = await rzp.orders.create(options);
        console.log(`[Payment] Razorpay order created: ${order.id}`);

        // Save payment record with 'created' status
        await Payment.create({
            userId: req.dbUser._id,
            orderId: order.id,
            amount: PLAN_PRICES[plan] / 100,
            status: 'created',
            plan,
        });

        res.status(200).json({
            success: true,
            data: {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID,
            },
        });
    } catch (error) {
        console.error('[Payment] Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order.',
        });
    }
};

/**
 * Verify Razorpay payment signature and finalize the payment.
 *
 * POST /api/payment/verify
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment verification fields.',
            });
        }

        console.log(`[Payment] Verifying signature for order: ${razorpay_order_id}`);

        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error('[Payment] RAZORPAY_KEY_SECRET is missing!');
            return res.status(500).json({
                success: false,
                message: 'Payment system configuration error.',
            });
        }

        // Verify signature using HMAC SHA256
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        const isValid = expectedSignature === razorpay_signature;
        console.log(`[Payment] Signature valid: ${isValid}`);

        if (!isValid) {
            console.error(`[Payment] Invalid signature for order: ${razorpay_order_id}`);
            // Mark payment as failed
            await Payment.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { status: 'failed' }
            );

            return res.status(400).json({
                success: false,
                message: 'Payment verification failed. Invalid signature.',
            });
        }

        // Update payment record
        const payment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                status: 'paid',
            },
            { new: true }
        );

        console.log(`[Payment] Payment record updated for order: ${razorpay_order_id}, status: ${payment?.status}`);

        if (!payment) {
            console.error(`[Payment] Payment record not found for order: ${razorpay_order_id}`);
            return res.status(404).json({
                success: false,
                message: 'Payment record not found.',
            });
        }

        // Update user's plan (only for core counseling packages)
        const corePlans = ['basic', 'elite', 'premium'];
        let updatedUser = null;
        if (corePlans.includes(payment.plan)) {
            updatedUser = await User.findByIdAndUpdate(
                payment.userId,
                { plan: payment.plan },
                { new: true }
            );
        } else {
            updatedUser = await User.findById(payment.userId);
        }

        console.log(`[Payment] Updating plan to ${payment.plan} for user ${updatedUser?._id}`);

        // Trigger Inngest event for background processing (email)
        // Wrapped in try-catch to prevent failure if Inngest is not configured
        try {
            if (process.env.INNGEST_EVENT_KEY) {
                await inngest.send({
                    name: 'payment/success',
                    data: {
                        userId: updatedUser._id.toString(),
                        userName: updatedUser.name,
                        userEmail: updatedUser.email,
                        plan: payment.plan,
                        paymentId: razorpay_payment_id,
                        amount: payment.amount,
                    },
                });
                console.log('[Payment] Inngest event sent successfully.');
            } else {
                console.warn('[Payment] INNGEST_EVENT_KEY missing, skipping email.');
            }
        } catch (inngestErr) {
            console.error('[Payment] Inngest error (non-fatal):', inngestErr);
        }

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully.',
            data: {
                plan: updatedUser.plan,
                paymentId: razorpay_payment_id,
            },
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed.',
        });
    }
};

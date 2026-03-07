import { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { createOrder, verifyPayment, setAuthToken, syncUser } from '../utils/api';

const plans = [
    {
        id: 'basic',
        name: 'Basic',
        price: '₹199',
        priceValue: 199,
        description: 'Start Smart with JEE Predictions',
        icon: Zap,
        color: 'from-slate-500 to-slate-700',
        cardBg: 'bg-white',
        features: [
            'Limited rank predictions',
            'Top 20 college results',
            'Previous year cutoff access',
            'Basic PDF counselling guide',
            'Email support (48 hr)',
        ],
        popular: false,
    },
    {
        id: 'elite',
        name: 'Elite',
        price: '₹999',
        priceValue: 999,
        description: 'Advanced AI-Powered Counselling',
        icon: Sparkles,
        color: 'from-indigo-500 to-purple-600',
        cardBg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        features: [
            'Everything in Basic PLUS',
            'Unlimited predictions',
            'Full college list (NIT, IIIT, GFTI)',
            'Branch probability %',
            'State quota filtering',
            'Priority support (24 hr)',
        ],
        popular: true,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '₹499',
        priceValue: 499,
        description: '1-on-1 Expert Counselling',
        icon: Crown,
        color: 'from-amber-500 to-orange-600',
        cardBg: 'bg-gradient-to-br from-amber-50 to-orange-50',
        features: [
            'Everything in Elite PLUS',
            '1-on-1 video session',
            'Personalized roadmap',
            'JoSAA / CSAB strategy call',
            'WhatsApp priority support',
            'Parent guidance session',
        ],
        popular: false,
    },
];

const Pricing = () => {
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubscribe = async (plan) => {
        if (plan.id === 'basic') return;

        if (!isSignedIn) {
            alert('Please sign in to subscribe.');
            return;
        }

        setLoading(plan.id);

        try {
            // Get Clerk token & set it for API calls
            const token = await getToken();
            setAuthToken(token);

            // Sync user to backend first
            await syncUser({
                clerkId: user.id,
                name: user.fullName || user.firstName || 'User',
                email: user.primaryEmailAddress?.emailAddress,
            });

            // Create Razorpay order
            const { data } = await createOrder(plan.id);
            const orderData = data.data;

            // Load Razorpay checkout
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'JEE Counselling Platform',
                description: `${plan.name} Plan Subscription`,
                order_id: orderData.orderId,
                handler: async (response) => {
                    try {
                        const currentToken = await getToken();
                        setAuthToken(currentToken);

                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyRes.data.success) {
                            window.location.href = `/payment-success?plan=${plan.id}`;
                        }
                    } catch (err) {
                        console.error('Verification failed:', err);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: user.fullName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                },
                theme: {
                    color: '#667eea',
                },
                modal: {
                    ondismiss: () => setLoading(null),
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to initiate payment. Please try again.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 pt-28 pb-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full mb-4"
                >
                    💎 Choose Your Plan
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
                >
                    Simple, Transparent{' '}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Pricing
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-slate-600 max-w-2xl mx-auto"
                >
                    Choose the perfect plan for your JEE counselling journey. Upgrade anytime as your needs grow.
                </motion.p>
            </div>

            {/* Plans Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className={`relative rounded-2xl ${plan.cardBg} border ${plan.popular ? 'border-indigo-300 shadow-xl shadow-indigo-100/50' : 'border-slate-200 shadow-lg'
                                } p-8 flex flex-col ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        ⭐ Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Icon & Name */}
                            <div className="mb-6">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                                >
                                    <plan.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                {plan.priceValue > 0 && (
                                    <span className="text-slate-500 text-sm ml-1">/ one-time</span>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                to={`/packages/${plan.id}`}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-200/50 hover:-translate-y-0.5'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5'
                                    }`}
                            >
                                Get {plan.name} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Trust Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="max-w-3xl mx-auto mt-16 text-center"
            >
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                    <span>🔒 Secure Payment</span>
                    <span>•</span>
                    <span>⚡ Instant Access</span>
                    <span>•</span>
                    <span>📧 Email Confirmation</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Pricing;

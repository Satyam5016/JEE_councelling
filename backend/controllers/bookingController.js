import Booking from '../models/Booking.js';
import sendEmail from '../utils/sendEmail.js';
import { getAuth } from '@clerk/express';

// @desc    Book a counselling session
// @route   POST /api/book-counselling
// @access  Private (Premium/Elite)
export const bookCounselling = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { name, email, phone, rank, category, branch, state, date, time } = req.body;

        // 1. Validation
        if (!name || !email || !phone || !rank || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // 2. Save Booking to DB
        const booking = await Booking.create({
            userId,
            name,
            email,
            phone,
            rank,
            category,
            branch,
            state,
            date,
            time
        });

        // 3. Email to User
        const userEmailOptions = {
            email: email,
            subject: 'Counselling Booking Received - JEE Counselling',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #1E3A8A; text-align: center;">Booking Confirmed!</h2>
                    <p>Hello <strong>${name}</strong>,</p>
                    <p>Your one-on-one expert counselling session has been requested successfully. Our expert will contact you at the scheduled time.</p>
                    
                    <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; font-size: 16px; color: #64748B;">Session Details:</h3>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
                        <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
                        <p style="margin: 5px 0;"><strong>Status:</strong> Pending Confirmation</p>
                    </div>

                    <p>If you need to reschedule, please reply to this email or contact us at +91 98765 43210.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #94A3B8; text-align: center;">
                        JEE Counselling Platform &copy; ${new Date().getFullYear()}
                    </p>
                </div>
            `
        };

        // 4. Email to Admin
        const adminEmailOptions = {
            email: process.env.ADMIN_EMAIL,
            subject: 'New Counselling Booking - Action Required',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1E3A8A;">New Booking Received</h2>
                    <p>A student has booked a premium counselling session.</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Student:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Rank:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${rank}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Schedule:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${date} at ${time}</td></tr>
                    </table>
                    <p>Please check the admin dashboard to confirm this booking.</p>
                </div>
            `
        };

        // Async trigger emails
        try {
            await Promise.all([
                sendEmail(userEmailOptions),
                sendEmail(adminEmailOptions)
            ]);
        } catch (emailError) {
            console.error('Booking Email Error:', emailError);
        }

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Counselling session booked successfully'
        });

    } catch (error) {
        console.error('Booking Controller Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to book session'
        });
    }
};

import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        console.log('Contact form submission received:', { name, email });

        // 1. Basic Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // 2. Save to MongoDB
        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        // 3. Send Email to Admin
        const adminEmailOptions = {
            email: process.env.ADMIN_EMAIL,
            subject: 'New Contact Message - JEE Counselling Platform',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1E3A8A;">New Inquiry from Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
                        ${message}
                    </div>
                </div>
            `
        };

        // 4. Send Confirmation Email to User
        const userEmailOptions = {
            email: email,
            subject: 'We Received Your Message - JEE Counselling',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1E3A8A;">Thank You for Reaching Out!</h2>
                    <p>Hello ${name},</p>
                    <p>We have received your message regarding JEE counselling. Our team will review your query and get back to you within 24 hours.</p>
                    <p><strong>Your Message:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; font-style: italic;">
                        "${message}"
                    </div>
                    <br />
                    <p>Best Regards,</p>
                    <p><strong>JEE Counselling Team</strong></p>
                </div>
            `
        };

        // Trigger emails asynchronously 
        try {
            await Promise.all([
                sendEmail(adminEmailOptions),
                sendEmail(userEmailOptions)
            ]);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // We still return success since the message is saved in DB
        }

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Contact Controller Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

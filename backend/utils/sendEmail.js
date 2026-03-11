import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    const missing = [];
    if (!process.env.EMAIL_USER) missing.push('EMAIL_USER');
    if (!process.env.EMAIL_PASS) missing.push('EMAIL_PASS');
    if (!process.env.ADMIN_EMAIL) missing.push('ADMIN_EMAIL');

    if (missing.length > 0) {
        const errorMsg = `Email configuration is incomplete (Missing: ${missing.join(', ')})`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log('Attempting to send email to:', options.email);

    try {
        const mailOptions = {
            from: `JEE Counselling Platform <${process.env.ADMIN_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Nodemailer Error:', error);
        throw error;
    }
};

export default sendEmail;

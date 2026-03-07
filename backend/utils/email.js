import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP (or Mailtrap)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send payment confirmation email.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.name - User's name
 * @param {string} options.plan - Plan purchased (elite/premium)
 * @param {string} options.paymentId - Razorpay payment ID
 * @param {number} options.amount - Amount paid in paise
 */
export const sendConfirmationEmail = async ({ to, name, plan, paymentId, amount }) => {
    const amountInRupees = (amount / 100).toFixed(2);
    const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1);

    const mailOptions = {
        from: `"JEE Counselling Platform" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Payment Successful - JEE Counselling Platform',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0; padding:0; background-color:#f4f7fa; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fa; padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 30px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:700;">
                      ✅ Payment Successful!
                    </h1>
                    <p style="color:rgba(255,255,255,0.9); margin:10px 0 0; font-size:14px;">
                      JEE Counselling Platform
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 30px;">
                    <p style="color:#333; font-size:16px; margin:0 0 20px; line-height:1.6;">
                      Hi <strong>${name}</strong>,
                    </p>
                    <p style="color:#555; font-size:15px; margin:0 0 25px; line-height:1.6;">
                      Thank you for your payment! Your subscription has been successfully activated. Here are the details:
                    </p>

                    <!-- Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9ff; border-radius:8px; padding:5px; margin-bottom:25px;">
                      <tr>
                        <td style="padding:20px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:8px 0; color:#666; font-size:14px;">Plan</td>
                              <td style="padding:8px 0; color:#333; font-size:14px; font-weight:600; text-align:right;">
                                ${planDisplay}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0; color:#666; font-size:14px; border-top:1px solid #e8e8f0;">Amount Paid</td>
                              <td style="padding:8px 0; color:#333; font-size:14px; font-weight:600; text-align:right; border-top:1px solid #e8e8f0;">
                                ₹${amountInRupees}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0; color:#666; font-size:14px; border-top:1px solid #e8e8f0;">Payment ID</td>
                              <td style="padding:8px 0; color:#333; font-size:13px; font-weight:600; text-align:right; border-top:1px solid #e8e8f0;">
                                ${paymentId}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Access Message -->
                    <div style="background-color:#e8f5e9; border-left:4px solid #4caf50; padding:15px 20px; border-radius:0 8px 8px 0; margin-bottom:25px;">
                      <p style="color:#2e7d32; font-size:14px; margin:0; font-weight:500;">
                        🎉 You now have full access to all ${planDisplay} features! Log in to your dashboard to explore.
                      </p>
                    </div>

                    <p style="color:#555; font-size:14px; margin:0; line-height:1.6;">
                      If you have any questions, feel free to reach out to our support team.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#f8f9fa; padding:25px 30px; text-align:center; border-top:1px solid #eee;">
                    <p style="color:#999; font-size:12px; margin:0;">
                      © ${new Date().getFullYear()} JEE Counselling Platform. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email send error:', error);
        throw error;
    }
};

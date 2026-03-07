import { inngest } from './client.js';
import { sendConfirmationEmail } from '../utils/email.js';

/**
 * Inngest function: Handle successful payment.
 * Triggered by the "payment/success" event.
 * Sends a confirmation email to the user via Nodemailer.
 */
export const paymentSuccessHandler = inngest.createFunction(
    {
        id: 'payment-success-handler',
        name: 'Payment Success Handler',
    },
    { event: 'payment/success' },
    async ({ event, step }) => {
        const { userName, userEmail, plan, paymentId, amount } = event.data;

        // Step 1: Send confirmation email
        await step.run('send-confirmation-email', async () => {
            await sendConfirmationEmail({
                to: userEmail,
                name: userName,
                plan,
                paymentId,
                amount,
            });

            return { emailSent: true };
        });

        return {
            message: `Payment confirmation email sent to ${userEmail}`,
            plan,
            paymentId,
        };
    }
);

// Export all Inngest functions as an array
export const inngestFunctions = [paymentSuccessHandler];

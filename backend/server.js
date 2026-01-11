
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Email Transporter Configuration
// NOTE: You must configure EMAIL_USER and EMAIL_PASS in your .env file
// For Gmail, use an App Password, not your login password.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

app.post('/api/send-invite', async (req, res) => {
    const { email, guestName, image } = req.body;
    
    if (!email || !image) {
        return res.status(400).json({ success: false, message: 'Missing email or image data.' });
    }

    console.log(`Sending email to ${email} for ${guestName}`);

    try {
        // Strip the data:image/png;base64, prefix if present
        const base64Data = image.split(';base64,').pop();

        await transporter.sendMail({
            from: `"The Dabhade Family" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Naamkaran Ceremony Invitation for ${guestName}`,
            html: `
                <div style="font-family: serif; color: #451a03; padding: 20px; background-color: #fffcf5; border: 1px solid #fbbf24;">
                    <h2 style="color: #d97706;">Namaskar ${guestName},</h2>
                    <p>We are absolutely delighted to invite you to the <strong>Naamkaran Ceremony</strong> of our beloved baby boy.</p>
                    <p>Please find your personalized 3D-styled invitation card attached to this email.</p>
                    <p>We look forward to your blessings and presence.</p>
                    <br/>
                    <p>Warm Regards,</p>
                    <p><strong>The Dabhade Family</strong></p>
                </div>
            `,
            attachments: [
                {
                    filename: `Invitation-${guestName.replace(/\s+/g, '-')}.png`,
                    content: base64Data,
                    encoding: 'base64'
                }
            ]
        });

        res.json({ success: true, message: 'Invitation sent successfully!' });
    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Please check server logs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});


import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, guestName, image } = req.body;

  if (!email || !image) {
    return res.status(400).json({ success: false, message: 'Missing email or image data.' });
  }

  // Use Environment Variables set in Vercel Dashboard
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
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

    return res.status(200).json({ success: true, message: 'Invitation sent successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email. Check Vercel logs.' });
  }
}

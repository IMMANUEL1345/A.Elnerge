// ============================================================
// api/contact.js — Vercel Serverless Function
// Handles contact form submissions and sends email via SendGrid
// API key stored safely in Vercel environment variables
// ============================================================

export default async function handler(req, res) {

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, industry, message } = req.body;

  // Basic validation
  if (!name || !email || !industry) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and industry are required.'
    });
  }

  // Load environment variables set in Vercel dashboard
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL       = process.env.FROM_EMAIL;
  const TO_EMAIL         = process.env.TO_EMAIL;

  if (!SENDGRID_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
    console.error('Missing environment variables');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error.'
    });
  }

  // Build the email
  const emailPayload = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL }],
        subject: `New Demo Request — ${name} (${industry})`,
      },
    ],
    from: {
      email: FROM_EMAIL,
      name:  'A. Elnerge Technologies Website',
    },
    reply_to: {
      email: email,
      name:  name,
    },
    content: [
      {
        type:  'text/html',
        value: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

            <div style="background:linear-gradient(135deg,#0F3260,#0E9B8A);padding:2rem;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:1.4rem;">New Demo Request</h1>
              <p style="color:rgba(255,255,255,0.8);margin:0.5rem 0 0;">A. Elnerge Technologies Website</p>
            </div>

            <div style="padding:2rem;background:#f4f7fb;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;font-weight:bold;color:#0F3260;width:30%;">Name</td>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;color:#333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;font-weight:bold;color:#0F3260;">Email</td>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;">
                    <a href="mailto:${email}" style="color:#0E9B8A;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;font-weight:bold;color:#0F3260;">Phone</td>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;color:#333;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;font-weight:bold;color:#0F3260;">Industry</td>
                  <td style="padding:0.8rem;background:#fff;border-bottom:1px solid #e0e0e0;">
                    <span style="background:#E8F0FB;color:#0F3260;padding:0.2rem 0.8rem;border-radius:20px;font-size:0.85rem;">${industry}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0.8rem;background:#fff;font-weight:bold;color:#0F3260;vertical-align:top;">Message</td>
                  <td style="padding:0.8rem;background:#fff;color:#333;">${message || 'No message provided'}</td>
                </tr>
              </table>

              <div style="margin-top:1.5rem;text-align:center;">
                <a href="mailto:${email}"
                   style="background:#0E9B8A;color:#fff;padding:0.8rem 2rem;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
                  Reply to ${name}
                </a>
              </div>
            </div>

            <div style="padding:1rem 2rem;background:#0F3260;text-align:center;">
              <p style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin:0;">
                A. Elnerge Technologies · IBA Suite · aelnerge.tech
              </p>
            </div>

          </div>
        `,
      },
    ],
  };

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('SendGrid error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! We will contact you within 24 hours.'
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
}
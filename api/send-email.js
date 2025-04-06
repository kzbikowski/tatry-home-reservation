// Pure JavaScript version that works in both ES Module and CommonJS environments
let resend;

export default async function handler(req, res) {
  // Initialize Resend inside the handler
  if (!resend) {
    try {
      const { Resend } = await import('resend');
      resend = new Resend(process.env.RESEND_API_KEY);
    } catch (error) {
      console.error("Failed to initialize Resend:", error);
      return res.status(500).json({ error: 'Failed to initialize email service' });
    }
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY is missing' });
  }

  try {
    const { name, email, phone, message, startDate, endDate, adults, children } = req.body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['booking@tatryhome.com'],
      subject: 'New booking request from TatryHome website',
      html: `
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Check-in date:</strong> ${startDate}</p>
        <p><strong>Check-out date:</strong> ${endDate}</p>
        <p><strong>Adults:</strong> ${adults}</p>
        <p><strong>Children:</strong> ${children}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 
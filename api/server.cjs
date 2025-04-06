// Local development server for API functions
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

// CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Test route to verify server is running
app.get('/', (req, res) => {
  res.json({ message: 'API server is running' });
});

// API endpoint for email sending
app.post('/api/send-email', async (req, res) => {
  console.log('Received request at /api/send-email');
  console.log('Request body:', req.body);
  
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY is missing' });
  }
  
  try {
    // Import Resend dynamically
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { 
      subject, 
      emailHtml, 
      name, 
      email, 
      phone, 
      message, 
      startDate, 
      endDate, 
      adults, 
      children 
    } = req.body;
    
    // Use provided emailHtml or build a default one from fields
    const htmlContent = emailHtml || `
      <h2>New booking request</h2>
      <p><strong>Name:</strong> ${name || ''}</p>
      <p><strong>Email:</strong> ${email || ''}</p>
      <p><strong>Phone:</strong> ${phone || ''}</p>
      <p><strong>Check-in date:</strong> ${startDate || ''}</p>
      <p><strong>Check-out date:</strong> ${endDate || ''}</p>
      <p><strong>Adults:</strong> ${adults || ''}</p>
      <p><strong>Children:</strong> ${children || ''}</p>
      <p><strong>Message:</strong> ${message || ''}</p>
    `;
    
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['tatryhomepl@gmail.com'],
      subject: subject || 'New booking request from TatryHome website',
      html: htmlContent
    });
    
    console.log('Resend API response:', JSON.stringify(data, null, 2));
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
});

// Test route specifically for the email endpoint
app.get('/api/send-email', (req, res) => {
  res.json({ message: 'Email endpoint is available (GET). Use POST to send emails.' });
});

// Start server
app.listen(port, () => {
  console.log(`API development server running at http://localhost:${port}`);
  console.log(`Test the server: http://localhost:${port}/`);
  console.log(`Email endpoint: http://localhost:${port}/api/send-email`);
}); 
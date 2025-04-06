// api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// IMPORTANT: Use a non-VITE_ prefixed environment variable for the backend
const apiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.RECIPIENT_EMAIL || 'tatryhomepl@gmail.com'; // Fallback

// Initialize Resend outside the handler if the key exists, 
// but check inside the handler before using it.
let resend: Resend | null = null;
if (apiKey) {
  resend = new Resend(apiKey);
} else {
  // Log this critical error during initialization if the key is missing
  console.error("FATAL: RESEND_API_KEY environment variable is not set on the server. Email sending will fail.");
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // === Check for API Key INSIDE the handler ===
  if (!resend || !apiKey) {
    // Log the error again in case the instance wasn't created
    console.error("API Key missing or Resend client not initialized. Cannot send email.");
    // Send a 500 error back to the client.
    return response.status(500).json({ error: 'Server configuration error. Email service not available.' });
  }
  // ============================================

  // Set CORS headers to allow requests from your frontend domain(s)
  // If you are only using the vercel.app domain or tatryhome.pl *after pointing it to Vercel*,
  // you might only need the specific domain. '*' is less secure but okay for simple cases.
  // Best practice: Replace '*' with your actual frontend domain(s) like 'https://tatryhome.pl'
  // or Vercel's assigned domain during testing.
  response.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production if needed
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (preflight check for CORS)
  if (request.method === 'OPTIONS') {
      return response.status(200).end();
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    // Extract data from the request body sent by the form
    const { emailHtml, subject } = request.body;

    // Basic validation
    if (!emailHtml || !subject) {
        console.warn('Missing required fields:', { hasHtml: !!emailHtml, hasSubject: !!subject });
        return response.status(400).json({ error: 'Missing required fields: emailHtml, subject' });
    }

    console.log(`Sending email to ${recipientEmail} with subject: ${subject}`);

    // Use the Resend SDK to send the email
    const { data, error } = await resend.emails.send({
      from: 'Tatry Home <onboarding@resend.dev>', // Using Resend's default verified domain
      to: [recipientEmail],                       // Send to your designated recipient
      subject: subject,
      html: emailHtml,
    });

    // Handle Resend API errors
    if (error) {
      console.error('Resend API Error:', JSON.stringify(error, null, 2));
      return response.status(400).json({ error: 'Error sending email via Resend', details: error.message });
    }

    // Success response
    console.log('Email sent successfully via Vercel function:', data);
    return response.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    // Handle unexpected server errors
    console.error('Server Error in /api/send-email:', error);
    // Ensure you send a response even in case of unexpected errors
    if (!response.headersSent) {
       response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
}
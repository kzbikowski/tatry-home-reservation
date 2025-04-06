// api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// IMPORTANT: Use a non-VITE_ prefixed environment variable for the backend
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // Log an error, but try to send a generic response to the client
  console.error("FATAL: RESEND_API_KEY environment variable is not set on the server.");
  // In a real scenario, you might want more robust error reporting here
  // For now, send a 500 error back to the client.
  return (response: VercelResponse) => response.status(500).json({ error: 'Server configuration error.' });
}

const resend = new Resend(apiKey);
// Use an environment variable for the recipient, with a fallback
const recipientEmail = process.env.RECIPIENT_EMAIL || 'tatryhomepl@gmail.com';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
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
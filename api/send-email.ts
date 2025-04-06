// @ts-ignore
// This needs to remain a true ES module 
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Explicitly use dynamic import to avoid module system issues
let Resend: any;

export default async function handler(
  req: VercelRequest, 
  res: VercelResponse
) {
  // CORS Headers
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
    // Initialize Resend dynamically to work around module system issues
    if (!Resend) {
      const module = await import('resend');
      Resend = module.Resend;
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Use TypeScript interfaces but keep the runtime code simple
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to send email: ${errorMessage}` });
  }
} 
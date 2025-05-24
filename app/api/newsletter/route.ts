import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

interface NewsletterRequest {
  email: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    const { email }: NewsletterRequest = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();
    await transporter.verify();

    const welcomeEmailOptions = {
        from: `"Newsletter" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: 'Welcome to our Newsletter!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welcome to our Newsletter</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 40px 20px; background-color: #000; color: #fff; border-radius: 8px; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background-color: #fff; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px; color: #000;">✉️</span>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome!</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Thank you for subscribing to our newsletter</p>
            </div>
            
            <div style="padding: 0 20px;">
              <h2 style="color: #000; font-size: 20px; margin-bottom: 15px;">What to expect:</h2>
              <ul style="color: #666; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Weekly updates with the latest news</li>
                <li style="margin-bottom: 8px;">Exclusive content and insights</li>
                <li style="margin-bottom: 8px;">Special offers and announcements</li>
              </ul>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0; border-left: 4px solid #000;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Note:</strong> You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
                </p>
              </div>
              
              <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                This email was sent to ${email}. If you didn't subscribe to this newsletter, please ignore this email.
              </p>
            </div>
          </body>
          </html>
        `,
        text: `
  Welcome to our Newsletter!
  
  Thank you for subscribing to our newsletter. Here's what you can expect:
  
  • Weekly updates with the latest news
  • Exclusive content and insights  
  • Special offers and announcements
  
  You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
  
  This email was sent to ${email}. If you didn't subscribe to this newsletter, please ignore this email.
        `
      };
  

    const adminNotificationOptions = {
        from: `"Newsletter System" <${process.env.EMAIL_USERNAME}>`,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USERNAME,
        subject: 'New Newsletter Subscription',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Newsletter Subscription</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px;">New Subscription!</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #000;">
              <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0; color: #666; font-size: 14px;"><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </body>
          </html>
        `,
        text: `
  New Newsletter Subscription
  
  Email: ${email}
  Subscribed at: ${new Date().toLocaleString()}
        `
      };

    await Promise.all([
      transporter.sendMail(welcomeEmailOptions),
      ...(process.env.CONTACT_EMAIL ? [transporter.sendMail(adminNotificationOptions)] : [])
    ]);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
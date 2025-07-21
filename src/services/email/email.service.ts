import nodemailer, { Transporter } from 'nodemailer';
import { env } from '@/lib/env';
import { 
  EmailConfig, 
  EmailOptions, 
  EmailResult, 
  NewsletterSubscription 
} from './email.types';

/**
 * Email service for handling all email operations
 */
export class EmailService {
  private transporter: Transporter | null = null;
  private config: EmailConfig;

  constructor(config?: EmailConfig) {
    this.config = config || {
      host: env.MAILTRAP_HOST,
      port: parseInt(env.MAILTRAP_PORT),
      secure: false,
      auth: {
        user: env.MAILTRAP_USER,
        pass: env.MAILTRAP_PASS,
      },
      connectionTimeout: 10000,
    };
  }

  /**
   * Initialize the email transporter
   */
  private async initializeTransporter(): Promise<void> {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport(this.config);
      await this.transporter.verify();
    }
  }

  /**
   * Send an email
   */
  public async sendEmail(options: EmailOptions): Promise<EmailResult> {
    try {
      await this.initializeTransporter();
      
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      const info = await this.transporter.sendMail(options);
      
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Send newsletter welcome email
   */
  public async sendNewsletterWelcome(
    subscription: NewsletterSubscription
  ): Promise<EmailResult> {
    const emailOptions: EmailOptions = {
      from: '"Brotea Team" <hello@brotea.xyz>',
      to: subscription.email,
      subject: 'Your Brotea Community Confirmation',
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'X-Mailer': 'Brotea Mailer System',
        'List-Unsubscribe': '<mailto:unsubscribe@brotea.xyz?subject=unsubscribe>'
      },
      text: this.getWelcomeTextContent(subscription),
      html: this.getWelcomeHtmlContent(subscription),
    };

    return this.sendEmail(emailOptions);
  }

  /**
   * Send admin notification email
   */
  public async sendAdminNotification(
    subscription: NewsletterSubscription
  ): Promise<EmailResult> {
    const emailOptions: EmailOptions = {
      from: '"Brotea System" <system@brotea.xyz>',
      to: 'hello@brotea.xyz',
      subject: 'New community member',
      text: this.getAdminTextContent(subscription),
      html: this.getAdminHtmlContent(subscription),
    };

    return this.sendEmail(emailOptions);
  }

  /**
   * Send newsletter subscription emails (both welcome and admin)
   */
  public async sendNewsletterEmails(
    subscription: NewsletterSubscription
  ): Promise<{ welcome: EmailResult; admin: EmailResult }> {
    const welcomeResult = await this.sendNewsletterWelcome(subscription);
    const adminResult = await this.sendAdminNotification(subscription);

    return {
      welcome: welcomeResult,
      admin: adminResult,
    };
  }

  /**
   * Get welcome email text content
   */
  private getWelcomeTextContent(subscription: NewsletterSubscription): string {
    return `Hello ${subscription.fullname},

Thank you for joining the Brotea community! We've received your request for: ${subscription.option}.

We'll keep you updated with relevant information.

Best regards,
The Brotea Team

https://brotea.xyz`;
  }

  /**
   * Get welcome email HTML content
   */
  private getWelcomeHtmlContent(subscription: NewsletterSubscription): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Brotea</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <tr>
              <td style="padding: 20px 0; text-align: center; background-color: #7E69AB;">
                <h1 style="color: #E6FFA9; margin: 0;">Welcome to Brotea!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <h2 style="color: #1A1F2C; margin-top: 0;">Hello ${subscription.fullname},</h2>
                <p>Thank you for joining the Brotea community! We're excited to have you with us.</p>
                <p>You selected: <strong>${subscription.option}</strong></p>
                <p>You'll soon receive news, events, and opportunities from Brotea directly in your inbox.</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://brotea.xyz" style="display: inline-block; background-color: #E6FFA9; color: #1A1F2C; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Brotea</a>
                </p>
                <p style="color: #777; margin-top: 40px; font-size: 14px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                  &copy; ${new Date().getFullYear()} Brotea. All rights reserved.<br>
                  If you didn't request this subscription, you can ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  /**
   * Get admin notification text content
   */
  private getAdminTextContent(subscription: NewsletterSubscription): string {
    return `New member details:
Name: ${subscription.fullname}
Email: ${subscription.email}
Interest: ${subscription.option}
Date: ${new Date().toLocaleString()}`;
  }

  /**
   * Get admin notification HTML content
   */
  private getAdminHtmlContent(subscription: NewsletterSubscription): string {
    return `
      <div style="font-family: Arial, sans-serif; padding: 15px;">
        <h3>New community member</h3>
        <p><b>Name:</b> ${subscription.fullname}</p>
        <p><b>Email:</b> ${subscription.email}</p>
        <p><b>Interest:</b> ${subscription.option}</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>
      </div>
    `;
  }

  /**
   * Close the transporter connection
   */
  public async close(): Promise<void> {
    if (this.transporter) {
      this.transporter.close();
      this.transporter = null;
    }
  }
}

// Export a singleton instance
export const emailService = new EmailService();
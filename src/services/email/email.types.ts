/**
 * Email service types and interfaces
 */

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  connectionTimeout?: number;
}

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
}

export interface NewsletterSubscription {
  fullname: string;
  email: string;
  option: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const EMAIL_TEMPLATES = {
  NEWSLETTER_WELCOME: 'newsletter-welcome',
  NEWSLETTER_ADMIN: 'newsletter-admin',
} as const;

export type EmailTemplate = typeof EMAIL_TEMPLATES[keyof typeof EMAIL_TEMPLATES];
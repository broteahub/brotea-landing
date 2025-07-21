/**
 * Newsletter API types
 */

export interface NewsletterRequest {
  fullname: string;
  email: string;
  option: string;
}

export interface NewsletterResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: unknown;
}

export interface NewsletterErrorResponse {
  error: string;
  details?: {
    fieldErrors?: Record<string, string[]>;
    formErrors?: string[];
  };
  retryAfter?: string;
}
/**
 * Newsletter form types
 */

export interface NewsletterFormData {
  fullname: string;
  email: string;
  option: string;
}

export interface NewsletterFormState {
  fullname: string;
  email: string;
  option: string;
  setFullname: (value: string) => void;
  setEmail: (value: string) => void;
  setOption: (value: string) => void;
  reset: () => void;
}

export interface NewsletterFormErrors {
  fullname?: string;
  email?: string;
  option?: string;
  general?: string;
}
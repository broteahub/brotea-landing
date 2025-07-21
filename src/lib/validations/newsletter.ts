import { z } from 'zod';

/**
 * Newsletter subscription form schema
 */
export const newsletterSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters')
    .transform(val => val.trim()),
    
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .transform(val => val.trim()),
    
  option: z
    .string()
    .min(1, 'Please select an option')
    .max(100, 'Option must be less than 100 characters')
    .transform(val => val.trim()),
});

/**
 * Type for validated newsletter data
 */
export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Validate newsletter form data
 */
export function validateNewsletterData(formData: FormData): {
  success: boolean;
  data?: NewsletterData;
  errors?: z.ZodError['formErrors'];
} {
  const rawData = {
    fullname: formData.get('fullname'),
    email: formData.get('email'),
    option: formData.get('option'),
  };
  
  const result = newsletterSchema.safeParse(rawData);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.formErrors,
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}
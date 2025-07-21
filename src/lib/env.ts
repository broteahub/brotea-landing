import { z } from 'zod';

/**
 * Server-side environment variables schema
 */
const serverEnvSchema = z.object({
  // Mailtrap SMTP Configuration
  MAILTRAP_HOST: z.string().min(1, "MAILTRAP_HOST is required"),
  MAILTRAP_PORT: z.string().regex(/^\d+$/, "MAILTRAP_PORT must be a valid port number"),
  MAILTRAP_USER: z.string().min(1, "MAILTRAP_USER is required"),
  MAILTRAP_PASS: z.string().min(1, "MAILTRAP_PASS is required"),
  
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Client-side environment variables schema
 * Prefixed with NEXT_PUBLIC_
 */
const clientEnvSchema = z.object({
  // Add client environment variables here if needed
  // NEXT_PUBLIC_API_URL: z.string().url(),
});

/**
 * Parse and validate environment variables
 */
function validateEnv() {
  // Only validate server env on server side
  if (typeof window === 'undefined') {
    const serverParsed = serverEnvSchema.safeParse(process.env);
    
    if (!serverParsed.success) {
      console.error(
        '❌ Invalid environment variables:',
        JSON.stringify(serverParsed.error.flatten().fieldErrors, null, 2)
      );
      throw new Error('Invalid environment variables');
    }
    
    return { server: serverParsed.data, client: {} };
  }
  
  // On client side, only validate client env
  const clientParsed = clientEnvSchema.safeParse(process.env);
  
  if (!clientParsed.success) {
    console.error(
      '❌ Invalid client environment variables:',
      JSON.stringify(clientParsed.error.flatten().fieldErrors, null, 2)
    );
    throw new Error('Invalid client environment variables');
  }
  
  return { server: {} as z.infer<typeof serverEnvSchema>, client: clientParsed.data };
}

const { server, client } = validateEnv();

/**
 * Validated environment variables
 * Use this throughout your application instead of process.env
 */
export const env = {
  ...server,
  ...client,
} as z.infer<typeof serverEnvSchema> & z.infer<typeof clientEnvSchema>;

/**
 * Type-safe environment variable access
 */
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type Env = ServerEnv & ClientEnv;
import { headers } from 'next/headers';

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

// Simple in-memory store for rate limiting
// In production, use Redis or another persistent store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
};

/**
 * Get client identifier from request
 */
async function getClientId(): Promise<string> {
  const headersList = await headers();
  
  // Try to get real IP from various headers
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');
  
  // Use the first available IP
  const ip = forwardedFor?.split(',')[0].trim() || 
             realIp || 
             cfConnectingIp || 
             'unknown';
  
  return ip;
}

/**
 * Check if request should be rate limited
 */
export async function rateLimit(
  identifier?: string
): Promise<RateLimitResult> {
  const clientId = identifier || await getClientId();
  const now = Date.now();
  const resetTime = now + RATE_LIMIT_CONFIG.windowMs;
  
  // Get or create rate limit entry
  const rateLimitEntry = rateLimitStore.get(clientId);
  
  if (!rateLimitEntry || rateLimitEntry.resetTime < now) {
    // New window or expired entry
    rateLimitStore.set(clientId, {
      count: 1,
      resetTime,
    });
    
    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      reset: resetTime,
    };
  }
  
  // Check if limit exceeded
  if (rateLimitEntry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      success: false,
      limit: RATE_LIMIT_CONFIG.maxRequests,
      remaining: 0,
      reset: rateLimitEntry.resetTime,
    };
  }
  
  // Increment count
  rateLimitEntry.count++;
  rateLimitStore.set(clientId, rateLimitEntry);
  
  return {
    success: true,
    limit: RATE_LIMIT_CONFIG.maxRequests,
    remaining: RATE_LIMIT_CONFIG.maxRequests - rateLimitEntry.count,
    reset: rateLimitEntry.resetTime,
  };
}

/**
 * Rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}
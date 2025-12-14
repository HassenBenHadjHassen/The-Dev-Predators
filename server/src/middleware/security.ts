// Security middleware
import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { config } from "../config/environment";

// Rate limiting configuration
export const createRateLimit = (windowMs: number, max: number) => {
  // Disable rate limiting in non-production environments
  if (config.NODE_ENV !== "production") {
    return (req: Request, res: Response, next: NextFunction) => next();
  }
  return rateLimit({
    windowMs,
    max,
    skip: (req) => req.method === "OPTIONS",
    message: {
      success: false,
      error: "Too many requests from this IP, please try again later.",
      statusCode: 429,
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  

// General rate limiter
export const generalRateLimit = createRateLimit(
  config.RATE_LIMIT_WINDOW_MS,
  config.RATE_LIMIT_MAX_REQUESTS
);

// Strict rate limiter for auth endpoints
export const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 requests per 15 minutes

// Helmet configuration for security headers
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// CORS configuration
export const corsConfig = cors({
  origin:
    config.CORS_ORIGIN || "https://the-dev-predators.hassenbenhadjhassen.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
});

// Request sanitization middleware
export const sanitizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Skip sanitization for OPTIONS requests (CORS preflight)
  if (req.method === "OPTIONS") {
    return next();
  }

  // Remove potentially dangerous characters from request body
  if (req.body && typeof req.body === "object") {
    sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === "object") {
    sanitizeObject(req.query);
  }

  next();
};

// Recursively sanitize object properties
const sanitizeObject = (obj: any): void => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "string") {
        // Remove potentially dangerous characters
        obj[key] = obj[key]
          .replace(/[<>]/g, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+=/gi, "")
          .trim();
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
};

// Security headers middleware
export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Remove X-Powered-By header
  res.removeHeader("X-Powered-By");

  next();
};

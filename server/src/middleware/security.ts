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
};

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
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Parse CORS_ORIGIN - can be a single origin or comma-separated list
    const allowedOrigins = config.CORS_ORIGIN.split(",").map((o: string) =>
      o.trim()
    );

    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
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

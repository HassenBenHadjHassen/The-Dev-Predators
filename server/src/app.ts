// Express application setup
import express, { Express } from "express";
import compression from "compression";
import morgan from "morgan";
import {
  helmetConfig,
  sanitizeRequest,
  securityHeaders,
} from "./middleware/security";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { config } from "./config/environment";
import routes from "./routes";
import cors from "cors";

const app: Express = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set("trust proxy", 1);

// CORS configuration - must be before other middleware to handle preflight requests
const allowedOrigins = [
  "https://the-dev-predators.hassenbenhadjhassen.com",
  config.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // For requests with credentials, we must return a specific origin, not true
      // Allow requests with no origin only in development
      if (!origin) {
        if (config.NODE_ENV === "development") {
          return callback(null, true);
        }
        // In production, reject requests without origin when credentials are required
        return callback(new Error("CORS: Origin header required"));
      }

      // Check if the origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
        // Return the specific origin (not true) to avoid wildcard
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

// Security middleware (after CORS to avoid header conflicts)
app.use(helmetConfig);
app.use(securityHeaders);
app.use(sanitizeRequest);

// Compression middleware
app.use(compression());

// Logging middleware
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SanteIA API Server",
    version: "1.0.0",
    documentation: "/api",
    statusCode: 200,
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;

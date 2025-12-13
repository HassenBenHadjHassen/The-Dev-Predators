import { Router, Router as ExpressRouter } from "express";
import { healthCheck } from "./health";

const router: ExpressRouter = Router();

// Health check endpoint
router.get("/health", healthCheck);

// API info endpoint
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SanteIA API Server",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
    },
    statusCode: 200,
  });
});

export default router;

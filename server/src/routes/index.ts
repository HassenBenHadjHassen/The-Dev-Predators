import { Router, Router as ExpressRouter } from "express";
import { healthCheck } from "./health";
import aiRoutes from "./aiRoutes";

const router: ExpressRouter = Router();

// Health check endpoint
router.get("/health", healthCheck);

// AI Routes
router.use("/ai", aiRoutes);

// API info endpoint
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "The Dev Predators API Server",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      ai: "/api/ai/reframe",
    },
    statusCode: 200,
  });
});

export default router;

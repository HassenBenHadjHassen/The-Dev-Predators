// Main server entry point
import app from "./app";
import { DatabaseConnection } from "./config/database";
import { config } from "./config/environment";

const PORT = config.PORT;
const HOST = config.HOST;

// Initialize database connection
const db = DatabaseConnection.getInstance();

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await db.connect();

    // Start HTTP server
    app.listen(PORT, () => {
      const protocol = config.NODE_ENV === "production" ? "https" : "http";
      const hostDisplay =
        config.NODE_ENV === "development" ? `${HOST}:${PORT}` : HOST;
      const fullUrl = `${protocol}://${hostDisplay}`;

      console.log(`🚀 Server running on ${fullUrl}`);
      console.log(`📊 Environment: ${config.NODE_ENV}`);
      console.log(`🔗 API Documentation: ${fullUrl}/api`);
      console.log(`❤️  Health Check: ${fullUrl}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (): Promise<void> => {
  console.log("\n🛑 Shutting down server gracefully...");

  try {
    await db.disconnect();
    console.log("✅ Database disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer();

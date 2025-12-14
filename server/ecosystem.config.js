module.exports = {
  apps: [
    {
      name: "the-dev-predators-server",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      listen_timeout: 3000,
      kill_timeout: 5000,
      wait_ready: false,
      // Graceful shutdown - PM2 will send SIGTERM
      shutdown_with_message: true,
    },
  ],
};


const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// Routes
const productRoutes = require("./routes/productRoutes");

const app = express();

// ===============================
// Global Middleware
// ===============================

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// ===============================
// Health Check
// ===============================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "Kreedum API",
    version: "8.1.0",
    status: "running",
  });
});

app.use(
  "/api/docs",
  swaggerUI.serve,
   swaggerUI.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Kreedum Sports API Documentation",
    customfavIcon:
      "https://kreedum.com/favicon.ico",
    customCss: `
      .swagger-ui .topbar {
        background-color: #0057B8;
      }

      .swagger-ui .topbar-wrapper img {
        display:none;
      }

      .swagger-ui .topbar-wrapper::after{
        content:"KREEDUM SPORTS API";
        color:white;
        font-size:24px;
        font-weight:bold;
      }
    `,
  })
);


// ===============================
// API Routes
// ===============================

app.use("/api/v1/products", productRoutes);

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error("API Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
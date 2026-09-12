const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "Kreedum API",
    version: "7.0.1",
    status: "running",
  });
});

module.exports = app;
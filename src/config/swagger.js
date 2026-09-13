const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Kreedum Sports Ecommerce API",
      version: "1.0.0",
      description:
        "Official REST API for Kreedum Sports Ecommerce Platform.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],

    tags: [
      { name: "Products" },
      { name: "Categories" },
      { name: "Brands" },
      { name: "Enquiries" },
    ],
  },

  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
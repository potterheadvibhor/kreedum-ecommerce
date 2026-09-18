const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Kreedum Sports Ecommerce API",
      version: "8.3.0",
      description:
        "Official REST API for Kreedum Sports Ecommerce Platform. Covers product catalog, homepage, search, authentication, wishlist, cart and future order management APIs.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter JWT token as: Bearer <your_token>",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      {
        name: "Products",
        description: "Product catalog and product detail APIs",
      },
      {
        name: "Categories",
        description: "Category hierarchy APIs",
      },
      {
        name: "Brands",
        description: "Brand listing APIs",
      },
      {
        name: "Search",
        description: "Search, suggestions and popular search APIs",
      },
      {
        name: "Homepage",
        description: "Homepage aggregation APIs",
      },
      {
        name: "Authentication",
        description: "Customer authentication APIs",
      },
      {
        name: "Wishlist",
        description: "Customer wishlist APIs",
      },
      {
        name: "Cart",
        description: "Shopping cart APIs",
      },
      {
        name: "Orders",
        description: "Order management APIs",
      },
      {
        name: "Enquiries",
        description: "Product enquiry APIs",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
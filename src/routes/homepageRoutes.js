const express = require("express");
const router = express.Router();

const homepageController = require("../controllers/homepageController");

/**
 * @swagger
 * tags:
 *   name: Homepage
 *   description: Homepage APIs for Kreedum Ecommerce
 */

/**
 * @swagger
 * /api/v1/homepage:
 *   get:
 *     summary: Get complete homepage data.
 *     description: Returns hero banners, categories, featured products, best sellers, new arrivals, trending products, deals, popular brands and statistics.
 *     tags: [Homepage]
 *     responses:
 *       200:
 *         description: Homepage data fetched successfully.
 */
router.get("/", homepageController.getHomepage);

/**
 * @swagger
 * /api/v1/homepage/stats:
 *   get:
 *     summary: Get homepage statistics.
 *     description: Returns total products, total categories and total brands.
 *     tags: [Homepage]
 *     responses:
 *       200:
 *         description: Homepage statistics fetched successfully.
 */
router.get("/stats", homepageController.getHomepageStats);

/**
 * @swagger
 * /api/v1/homepage/deals:
 *   get:
 *     summary: Get today's deals.
 *     description: Returns products sorted by highest discount percentage.
 *     tags: [Homepage]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of deal products to return.
 *     responses:
 *       200:
 *         description: Deals fetched successfully.
 */
router.get("/deals", homepageController.getDeals);

/**
 * @swagger
 * /api/v1/homepage/featured:
 *   get:
 *     summary: Get featured homepage products.
 *     description: Returns featured products or fallback products if none are marked featured.
 *     tags: [Homepage]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of featured products to return.
 *     responses:
 *       200:
 *         description: Featured products fetched successfully.
 */
router.get("/featured", homepageController.getFeaturedProducts);

module.exports = router;
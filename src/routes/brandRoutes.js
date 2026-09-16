const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Kreedum Ecommerce Brand APIs
 */

/**
 * @swagger
 * /api/v1/brands:
 *   get:
 *     summary: Get all brands.
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands fetched successfully.
 */
router.get('/', brandController.getBrands);

/**
 * @swagger
 * /api/v1/brands/{slug}:
 *   get:
 *     summary: Get brand details.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: aerofit
 *     responses:
 *       200:
 *         description: Brand fetched successfully.
 *       404:
 *         description: Brand not found.
 */
router.get('/:slug', brandController.getBrand);

/**
 * @swagger
 * /api/v1/brands/{slug}/products:
 *   get:
 *     summary: Get products by brand.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: aerofit
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *           example: cardio
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - price_low_high
 *             - price_high_low
 *             - discount
 *             - featured
 *             - popular
 *             - name
 *     responses:
 *       200:
 *         description: Brand products fetched successfully.
 */
router.get('/:slug/products', brandController.getBrandProducts);

module.exports = router;
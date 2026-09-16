const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Kreedum Ecommerce Category APIs
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get complete category tree.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category tree fetched successfully.
 */
router.get('/', categoryController.getCategoryTree);

/**
 * @swagger
 * /api/v1/categories/{slug}:
 *   get:
 *     summary: Get category details.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully.
 *       404:
 *         description: Category not found.
 */
router.get('/:slug', categoryController.getCategory);

/**
 * @swagger
 * /api/v1/categories/{slug}/products:
 *   get:
 *     summary: Get products inside a category.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
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
 *             - name
 *     responses:
 *       200:
 *         description: Category products fetched successfully.
 */
router.get('/:slug/products', categoryController.getCategoryProducts);

module.exports = router;
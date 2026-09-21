const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Customer Order APIs
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Place a new order from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *               paymentMethod:
 *                 type: string
 *                 example: COD
 *               notes:
 *                 type: string
 *                 example: Deliver after 5 PM
 *     responses:
 *       201:
 *         description: Order placed successfully.
 */
router.post("/", authMiddleware, orderController.placeOrder);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders of logged-in customer
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully.
 */
router.get("/", authMiddleware, orderController.getMyOrders);

/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68cd4d24e2b56b95f2d0d6e1
 *     responses:
 *       200:
 *         description: Order fetched successfully.
 */
router.get("/:orderId", authMiddleware, orderController.getOrderDetails);

/**
 * @swagger
 * /api/v1/orders/{orderId}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68cd4d24e2b56b95f2d0d6e1
 *     responses:
 *       200:
 *         description: Order cancelled successfully.
 */
router.patch("/:orderId/cancel", authMiddleware, orderController.cancelOrder);

/**
 * @swagger
 * /api/v1/orders/{orderId}/tracking:
 *   get:
 *     summary: Get tracking timeline of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68cd4d24e2b56b95f2d0d6e1
 *     responses:
 *       200:
 *         description: Tracking timeline fetched successfully.
 */
router.get(
  "/:orderId/tracking",
  authMiddleware,
  orderController.getTrackingTimeline
);

module.exports = router;
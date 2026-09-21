const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const savedAddressController = require("../controllers/savedAddressController");

/**
 * @swagger
 * tags:
 *   name: Saved Addresses
 *   description: Customer Saved Address APIs
 */

/**
 * @swagger
 * /api/v1/addresses:
 *   post:
 *     summary: Save a new customer address
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - fullName
 *               - phone
 *               - addressLine1
 *               - locality
 *               - city
 *               - district
 *               - state
 *               - country
 *               - pincode
 *             properties:
 *               label:
 *                 type: string
 *                 example: Home
 *               fullName:
 *                 type: string
 *                 example: Vibhor Jain
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               addressLine1:
 *                 type: string
 *                 example: B-12 Vineet Khand
 *               addressLine2:
 *                 type: string
 *                 example: Near CMS School
 *               locality:
 *                 type: string
 *                 example: Gomtinagar
 *               city:
 *                 type: string
 *                 example: Lucknow
 *               district:
 *                 type: string
 *                 example: Lucknow
 *               state:
 *                 type: string
 *                 example: Uttar Pradesh
 *               country:
 *                 type: string
 *                 example: India
 *               pincode:
 *                 type: string
 *                 example: "226010"
 *     responses:
 *       201:
 *         description: Address saved successfully.
 *       400:
 *         description: Validation failed or duplicate address.
 *       401:
 *         description: Unauthorized.
 */
router.post("/", authMiddleware, savedAddressController.createAddress);

/**
 * @swagger
 * /api/v1/addresses:
 *   get:
 *     summary: Get all saved addresses
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/", authMiddleware, savedAddressController.getAddresses);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   get:
 *     summary: Get address by ID
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d13d20c5e0b96f71234567
 *     responses:
 *       200:
 *         description: Address fetched successfully.
 *       400:
 *         description: Invalid address ID.
 *       404:
 *         description: Address not found.
 */
router.get("/:id", authMiddleware, savedAddressController.getAddressById);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   patch:
 *     summary: Update saved address
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d13d20c5e0b96f71234567
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine2:
 *                 type: string
 *                 example: Opposite CMS School
 *               locality:
 *                 type: string
 *                 example: Vineet Khand
 *               pincode:
 *                 type: string
 *                 example: "226018"
 *     responses:
 *       200:
 *         description: Address updated successfully.
 */
router.patch("/:id", authMiddleware, savedAddressController.updateAddress);

/**
 * @swagger
 * /api/v1/addresses/{id}/default:
 *   patch:
 *     summary: Set default saved address
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d13d20c5e0b96f71234567
 *     responses:
 *       200:
 *         description: Default address updated successfully.
 *       400:
 *         description: Invalid address ID.
 *       404:
 *         description: Address not found.
 */
router.patch("/:id/default",authMiddleware,savedAddressController.setDefaultAddress);

/**
 * @swagger
 * /api/v1/addresses/{id}:
 *   delete:
 *     summary: Delete saved address
 *     tags: [Saved Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d13d20c5e0b96f71234567
 *     responses:
 *       200:
 *         description: Address deleted successfully.
 *       400:
 *         description: Invalid address ID.
 *       404:
 *         description: Address not found.
 */
router.delete("/:id", authMiddleware, savedAddressController.deleteAddress);

module.exports = router;
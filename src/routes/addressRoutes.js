const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Indian Pincode Lookup API
 */

/**
 * @swagger
 * /api/v1/address/pincode/{pincode}:
 *   get:
 *     summary: Get city and state using Indian pincode
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *         example: "226010"
 *     responses:
 *       200:
 *         description: Pincode found successfully.
 *       400:
 *         description: Invalid Indian pincode.
 *       404:
 *         description: Pincode not found.
 */
router.get("/pincode/:pincode", addressController.getAddressByPincode);

module.exports = router;
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Customer Profile & Dashboard APIs
 */

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get logged-in customer profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/", authMiddleware, profileController.getProfile);



/**
 * @swagger
 * /api/v1/profile/password:
 *   patch:
 *     summary: Change logged-in customer's password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: Password@123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword@123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword@123
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.patch(
  "/password",
  authMiddleware,
  profileController.changePassword
);

/**
 * @swagger
 * /api/v1/profile/dashboard:
 *   get:
 *     summary: Get customer dashboard summary
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully.
 *       401:
 *         description: Unauthorized.
 */


router.get(
  "/dashboard",
  authMiddleware,
  profileController.getDashboard
);

/**
 * @swagger
 * /api/v1/profile:
 *   patch:
 *     summary: Update logged-in customer profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Vibhor
 *               lastName:
 *                 type: string
 *                 example: Jain
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/", authMiddleware, profileController.updateProfile);

module.exports = router;
const authService = require("../services/authService");

class AuthController {

  // ----------------------------
  // Register Customer
  // ----------------------------
  async register(req, res) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "Customer registered successfully.",
        data: result,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ----------------------------
  // Login Customer
  // ----------------------------
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ----------------------------
  // Logged-in User Profile
  // ----------------------------
  async getProfile(req, res) {
    try {
      const profile = await authService.getProfile(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully.",
        data: profile,
      });

    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ----------------------------
  // Update Profile
  // ----------------------------
  async updateProfile(req, res) {
    try {
      const profile = await authService.updateProfile(
        req.user._id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        data: profile,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
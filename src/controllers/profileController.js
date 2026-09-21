const profileService = require("../services/profileService");

class ProfileController {

  async getProfile(req, res) {
    try {
      const profile = await profileService.getProfile(req.user._id);

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

  async getDashboard(req, res) {
    try {
      const dashboard = await profileService.getDashboard(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Dashboard fetched successfully.",
        data: dashboard,
      });

    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

async updateProfile(req, res) {
  try {
    const profile = await profileService.updateProfile(
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

async changePassword(req, res) {
  try {
    const response = await profileService.changePassword(
      req.user._id,
      req.body
    );

    return res.status(200).json(response);

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

}

module.exports = new ProfileController();
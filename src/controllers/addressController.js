const addressService = require("../services/addressService");

class AddressController {
  async getAddressByPincode(req, res) {
    try {
      const { pincode } = req.params;

      const address = await addressService.getAddressByPincode(pincode);

      return res.status(200).json({
        success: true,
        message: "Pincode found successfully.",
        data: address,
      });
    } catch (error) {
      const statusCode =
        error.message === "Pincode not found."
          ? 404
          : error.message === "Invalid Indian pincode."
          ? 400
          : 503;

      return res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AddressController();
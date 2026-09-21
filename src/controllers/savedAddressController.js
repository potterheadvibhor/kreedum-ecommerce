const savedAddressService = require("../services/savedAddressService");

class SavedAddressController {

  // POST /addresses
  async createAddress(req, res) {
    try {
      const address = await savedAddressService.createAddress(
        req.user._id,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Address saved successfully.",
        data: address,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /addresses
  async getAddresses(req, res) {
    try {
      const addresses = await savedAddressService.getAddresses(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Addresses fetched successfully.",
        data: addresses,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /addresses/:id
  async getAddressById(req, res) {
    try {
      const address = await savedAddressService.getAddressById(
        req.user._id,
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Address fetched successfully.",
        data: address,
      });

    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PATCH /addresses/:id
  async updateAddress(req, res) {
    try {
      const address = await savedAddressService.updateAddress(
        req.user._id,
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Address updated successfully.",
        data: address,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PATCH /addresses/:id/default
  async setDefaultAddress(req, res) {
    try {
      const address = await savedAddressService.setDefaultAddress(
        req.user._id,
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Default address updated successfully.",
        data: address,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE /addresses/:id
  async deleteAddress(req, res) {
    try {
      const response = await savedAddressService.deleteAddress(
        req.user._id,
        req.params.id
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

module.exports = new SavedAddressController();
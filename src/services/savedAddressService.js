const mongoose = require("mongoose");

const Address = require("../models/Address");

class savedAddressService {

  // =====================================================
  // Create New Address
  // =====================================================

  async createAddress(userId, payload) {

    const existing = await Address.findOne({
      user: userId,
      addressLine1: payload.addressLine1.trim(),
      pincode: payload.pincode,
      isActive: true,
    });

    if (existing) {
      throw new Error("Address already exists.");
    }

    const totalAddresses = await Address.countDocuments({
      user: userId,
      isActive: true,
    });

    const address = await Address.create({
      user: userId,
      ...payload,
      isDefault: totalAddresses === 0,
    });

    return address;
  }

  // =====================================================
  // Get All Addresses
  // =====================================================

  async getAddresses(userId) {

    return await Address.find({
      user: userId,
      isActive: true,
    })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();
  }

  // =====================================================
  // Get Single Address
  // =====================================================

  async getAddressById(userId, addressId) {

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address ID.");
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
      isActive: true,
    }).lean();

    if (!address) {
      throw new Error("Address not found.");
    }

    return address;
  }

  // =====================================================
  // Update Address
  // =====================================================

  async updateAddress(userId, addressId, payload) {

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address ID.");
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
      isActive: true,
    });

    if (!address) {
      throw new Error("Address not found.");
    }

    Object.assign(address, payload);

    await address.save();

    return address;
  }

  // =====================================================
  // Set Default Address
  // =====================================================

  async setDefaultAddress(userId, addressId) {

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address ID.");
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
      isActive: true,
    });

    if (!address) {
      throw new Error("Address not found.");
    }

    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );

    address.isDefault = true;
    await address.save();

    return address;
  }

  // =====================================================
  // Delete Address (Soft Delete)
  // =====================================================

  async deleteAddress(userId, addressId) {

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      throw new Error("Invalid address ID.");
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
      isActive: true,
    });

    if (!address) {
      throw new Error("Address not found.");
    }

    const wasDefault = address.isDefault;

    address.isActive = false;
    address.isDefault = false;

    await address.save();

    // Promote another address if default was deleted
    if (wasDefault) {
      const nextAddress = await Address.findOne({
        user: userId,
        isActive: true,
      }).sort({ createdAt: 1 });

      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    return {
      success: true,
      message: "Address deleted successfully.",
    };
  }
}

module.exports = new savedAddressService();
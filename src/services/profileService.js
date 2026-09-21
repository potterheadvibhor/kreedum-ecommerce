const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");

class ProfileService {

  // ===========================================
  // Get Logged-in User Profile
  // ===========================================

  async getProfile(userId) {

    const user = await User.findById(userId)
      .select("-password -__v")
      .lean();

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  // ===========================================
// Update Profile
// ===========================================

async updateProfile(userId, payload) {

  const allowedFields = [
    "firstName",
    "lastName",
    "phone"
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      updates[field] =
        typeof payload[field] === "string"
          ? payload[field].trim()
          : payload[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  // Phone number validation
  if (
    updates.phone &&
    !/^[6-9][0-9]{9}$/.test(updates.phone)
  ) {
    throw new Error("Invalid phone number.");
  }

  // Phone uniqueness
  if (updates.phone) {
    const existingUser = await User.findOne({
      phone: updates.phone,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new Error("Phone number already exists.");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updates,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -__v");

  if (!updatedUser) {
    throw new Error("User not found.");
  }

  return updatedUser;
}

  // ===========================================
  // Dashboard Summary
  // ===========================================

  async getDashboard(userId) {

    const user = await User.findById(userId)
      .select("firstName lastName email phone role createdAt")
      .lean();

    if (!user) {
      throw new Error("User not found.");
    }

    const [wishlistItems, cartItems, totalOrders, defaultAddress] =
      await Promise.all([
        Wishlist.countDocuments({ user: userId }),
        Cart.countDocuments({ user: userId }),
        Order.countDocuments({ user: userId }),
        Address.findOne({
          user: userId,
          isDefault: true,
          isActive: true,
        }).lean(),
      ]);

    return {
      user,
      stats: {
        wishlistItems,
        cartItems,
        totalOrders,
      },
      defaultAddress,
    };
  }

// ===========================================
// Change Password
// ===========================================

async changePassword(userId, payload) {

  const { currentPassword, newPassword, confirmPassword } = payload;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All password fields are required.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirm password do not match.");
  }

  // Password strength
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
    );
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new Error("User not found.");
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect.");
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new Error("New password cannot be the same as current password.");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return {
    success: true,
    message: "Password changed successfully.",
  };
}

}



module.exports = new ProfileService();
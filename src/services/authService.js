const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

class AuthService {

  // ----------------------------
  // Register Customer
  // ----------------------------
  async register(userData) {
    const { firstName, lastName, email, phone, password } = userData;

     // Required field validation
  if (!firstName || !email || !password) {
    throw new Error("First name, email and password are required.");
  }

  const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.toLowerCase())) {
  throw new Error("Invalid email format.");
}

  // Password should not be empty spaces
  if (password.trim().length === 0) {
    throw new Error("Password cannot be empty.");
  }

if (password.length < 8) {
  throw new Error(
    "Password must be at least 8 characters long."
  );
}

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  // ----------------------------
  // Login Customer
  // ----------------------------
  async login(email, password) {
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new Error("Invalid email or password.");
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  // ----------------------------
  // Get Logged-in User
  // ----------------------------
  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    };
  }

  // ----------------------------
  // Update Customer Profile
  // ----------------------------
  async updateProfile(userId, profileData) {
    const { firstName, lastName, phone } = profileData;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (firstName) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  }
}

module.exports = new AuthService();
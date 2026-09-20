const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: "cart",
  }
);

// Prevent duplicate cart entries per user
cartSchema.index(
  { user: 1, product: 1 },
  {
    unique: true,
    name: "cart_user_product_unique",
  }
);

module.exports = mongoose.model("Cart", cartSchema);
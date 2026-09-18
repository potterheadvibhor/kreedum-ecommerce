const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
    collection: "wishlists",
  }
);

// One product can exist only once per user wishlist.
wishlistSchema.index(
  { user: 1, product: 1 },
  {
    unique: true,
    name: "wishlist_user_product_unique",
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
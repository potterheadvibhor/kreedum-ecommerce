const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    supplier: {
      type: String,
      default: "metrosports",
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    sku: {
      type: String,
      index: true,
    },

    brand: {
      type: String,
      index: true,
    },

    department: {
      type: String,
      index: true,
    },

    parentCategory: {
      type: String,
      index: true,
    },

    childCategory: {
      type: String,
      index: true,
    },

    categoryPath: [String],

    mrp: Number,
    sellingPrice: Number,

    discountPercent: Number,

    thumbnail: String,

    images: [String],

    descriptionHtml: String,
    descriptionText: String,

    features: [String],

    specifications: {
      type: Object,
      default: {},
    },

    searchKeywords: {
      type: [String],
      index: true,
    },

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    visibility: {
      type: String,
      enum: ["published", "draft", "hidden"],
      default: "published",
    },

    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock", "enquiry_only"],
      default: "enquiry_only",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sourceUrl: String,

    lastSyncedAt: Date,
  },
  {
    timestamps: true,
    collection: "products",
  }
);

// -------- Indexes --------

productSchema.index({
  name: "text",
  brand: "text",
  sku: "text",
});

productSchema.index({
  department: 1,
  parentCategory: 1,
  childCategory: 1,
});

module.exports = mongoose.model("Product", productSchema);
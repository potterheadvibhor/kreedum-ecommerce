const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // =====================================================
    // SOURCE INFORMATION
    // =====================================================

    supplier: {
      type: String,
      default: "metrosports",
      index: true,
    },

    supplierProductId: {
      type: String,
      default: "",
    },

    sourceUrl: {
      type: String,
      default: "",
    },

    syncVersion: {
      type: Number,
      default: 1,
    },

    lastSyncedAt: Date,

    // =====================================================
    // BASIC PRODUCT INFORMATION
    // =====================================================

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
      default: "",
      index: true,
    },

    brand: {
      type: String,
      default: "",
      index: true,
    },

    brandSlug: {
      type: String,
      default: "",
      index: true,
    },

    // =====================================================
    // CATEGORY STRUCTURE
    // =====================================================

    department: {
      type: String,
      default: "",
      index: true,
    },

    parentCategory: {
      type: String,
      default: "",
      index: true,
    },

    childCategory: {
      type: String,
      default: "",
      index: true,
    },

    categoryPath: {
      type: [String],
      default: [],
    },

    // =====================================================
    // PRICING
    // =====================================================

    mrp: {
      type: Number,
      default: 0,
    },

    sellingPrice: {
      type: Number,
      default: 0,
    },

    discountPercent: {
      type: Number,
      default: 0,
    },

    // =====================================================
    // MEDIA
    // =====================================================

    thumbnail: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    // =====================================================
    // PRODUCT DESCRIPTION
    // =====================================================

    descriptionHtml: {
      type: String,
      default: "",
    },

    descriptionText: {
      type: String,
      default: "",
    },

    // =====================================================
    // FEATURES & SPECIFICATIONS
    // =====================================================

    features: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    specifications: {
      type: Object,
      default: {},
    },

    // =====================================================
    // PRODUCT DETAILS
    // =====================================================

    warranty: {
      type: String,
      default: "",
    },

    maxUserWeight: {
      type: String,
      default: "",
    },

    dimensions: {
      type: String,
      default: "",
    },

    weight: {
      type: String,
      default: "",
    },

    countryOfOrigin: {
      type: String,
      default: "India",
    },

    // =====================================================
    // SEARCH & SEO
    // =====================================================

    searchKeywords: {
      type: [String],
      default: [],
    },

    seo: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      keywords: {
        type: [String],
        default: [],
      },
    },

    // =====================================================
    // WEBSITE VISIBILITY
    // =====================================================

    visibility: {
      type: String,
      enum: ["published", "draft", "hidden"],
      default: "published",
      index: true,
    },

    stockStatus: {
      type: String,
      enum: [
        "in_stock",
        "out_of_stock",
        "enquiry_only",
        "preorder",
      ],
      default: "enquiry_only",
      index: true,
    },

    availabilityMessage: {
      type: String,
      default: "Contact Kreedum Sports for product availability.",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // =====================================================
    // MARKETING FLAGS
    // =====================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    badge: {
      type: String,
      enum: ["", "Best Seller", "New Arrival", "Trending", "Hot Deal"],
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    // =====================================================
    // ANALYTICS
    // =====================================================

    viewCount: {
      type: Number,
      default: 0,
    },

    enquiryCount: {
      type: Number,
      default: 0,
    },

    popularityScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

// =====================================================
// INDEXES
// =====================================================

// Full-text search for website & WhatsApp bot
productSchema.index(
  {
    name: "text",
    brand: "text",
    sku: "text",
    searchKeywords: "text",
    descriptionText: "text",
  },
  {
    weights: {
      name: 10,
      sku: 9,
      brand: 8,
      searchKeywords: 7,
      descriptionText: 2,
    },
  }
);

// Category filtering
productSchema.index({
  department: 1,
  parentCategory: 1,
  childCategory: 1,
});



// Homepage sections
productSchema.index({
  isFeatured: 1,
  isBestSeller: 1,
  isNewArrival: 1,
  isTrending: 1,
});

// Price filters
productSchema.index({
  sellingPrice: 1,
});

// Visibility filters
productSchema.index({
  visibility: 1,
  stockStatus: 1,
});

module.exports = mongoose.model("Product", productSchema);
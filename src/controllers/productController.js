const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const buildProductQuery = require("../utils/productQueryBuilder");

exports.getProducts = asyncHandler(async (req, res) => {
  let { page = 1, limit = 20 } = req.query;

  page = Number(page);
  limit = Math.min(Number(limit), 50); // Maximum 50 products

  const { query, sortOption } = buildProductQuery(req.query);

  const totalProducts = await Product.countDocuments(query);

  const products = await Product.find(query)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit)
    .select([
      "name",
      "slug",
      "brand",
      "brandSlug",
      "thumbnail",
      "sellingPrice",
      "mrp",
      "discountPercent",
      "department",
      "parentCategory",
      "childCategory",
      "badge",
      "stockStatus",
      "isFeatured",
      "isBestSeller",
      "isNewArrival",
    ]);

  res.status(200).json({
    success: true,

    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      hasNextPage: page * limit < totalProducts,
      hasPrevPage: page > 1,
    },

    count: products.length,

    filters: {
  department: req.query.department || null,
  parentCategory: req.query.parentCategory || null,
  childCategory: req.query.childCategory || null,
  brand: req.query.brand || null,
  stockStatus: req.query.stockStatus || null,

  featured: req.query.featured === "true",
  bestSeller: req.query.bestSeller === "true",
  newArrival: req.query.newArrival === "true",
  trending: req.query.trending === "true",

  minPrice: req.query.minPrice
    ? Number(req.query.minPrice)
    : null,

  maxPrice: req.query.maxPrice
    ? Number(req.query.maxPrice)
    : null,

  sort: req.query.sort || "latest",
},

    products,
  });
});


exports.getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({
    slug,
    visibility: "published",
    isActive: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  // Related products from same child category
  const relatedProducts = await Product.find({
    childCategory: product.childCategory,
    slug: { $ne: product.slug },
    visibility: "published",
    isActive: true,
  })
    .limit(8)
    .select([
      "name",
      "slug",
      "thumbnail",
      "sellingPrice",
      "mrp",
      "discountPercent",
      "brand",
      "badge",
    ]);

  res.status(200).json({
    success: true,
    product,
    relatedProducts,
  });
});
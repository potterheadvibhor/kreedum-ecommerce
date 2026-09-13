/**
 * Build Mongo query and sorting from request query params.
 */

function buildProductQuery(queryParams) {
  const query = {
    visibility: "published",
    isActive: true,
  };

  const {
    department,
    parentCategory,
    childCategory,
    brand,
    stockStatus,
    featured,
    bestSeller,
    newArrival,
    trending,
    minPrice,
    maxPrice,
    sort,
  } = queryParams;

  // Category Filters
  if (department) query.department = department;

  if (parentCategory) query.parentCategory = parentCategory;

  if (childCategory) query.childCategory = childCategory;

  // Brand Filter
  if (brand) query.brandSlug = brand;

  // Stock Filter
  if (stockStatus) query.stockStatus = stockStatus;

  // Homepage Filters
  if (featured === "true") query.isFeatured = true;

  if (bestSeller === "true") query.isBestSeller = true;

  if (newArrival === "true") query.isNewArrival = true;

  if (trending === "true") query.isTrending = true;

  // Price Range
  if (minPrice || maxPrice) {
    query.sellingPrice = {};

    if (minPrice) query.sellingPrice.$gte = Number(minPrice);

    if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
  }

  // Sorting
  let sortOption = {
    createdAt: -1,
  };

  switch (sort) {
    case "price_low_high":
      sortOption = { sellingPrice: 1 };
      break;

    case "price_high_low":
      sortOption = { sellingPrice: -1 };
      break;

    case "discount":
      sortOption = { discountPercent: -1 };
      break;

    case "popular":
      sortOption = { popularityScore: -1 };
      break;

    case "featured":
  sortOption = {
    isFeatured: -1,
    displayOrder: 1,
    createdAt: -1,
  };
  break;

    default:
      sortOption = { createdAt: -1 };
  }

  return { query, sortOption };
}

module.exports = buildProductQuery;
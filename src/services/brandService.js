const Brand = require('../models/Brand');
const Product = require('../models/Product');

class BrandService {
  // Get all brands with product counts
  async getAllBrands() {
    const brands = await Brand.find({})
      .sort({ name: 1 })
      .lean();

    const brandsWithCounts = await Promise.all(
      brands.map(async (brand) => {
        const productCount = await Product.countDocuments({
          brandSlug: brand.slug,
          visibility: 'published',
          isActive: true,
        });

        return {
          ...brand,
          productCount,
        };
      })
    );

    return brandsWithCounts;
  }

  // Get brand by slug
  async getBrandBySlug(slug) {
    const brand = await Brand.findOne({ slug }).lean();

    if (!brand) return null;

    const stats = {
      totalProducts: await Product.countDocuments({
        brandSlug: slug,
        visibility: 'published',
        isActive: true,
      }),

      featuredProducts: await Product.countDocuments({
        brandSlug: slug,
        isFeatured: true,
        visibility: 'published',
        isActive: true,
      }),

      bestSellers: await Product.countDocuments({
        brandSlug: slug,
        isBestSeller: true,
        visibility: 'published',
        isActive: true,
      }),
    };

    return {
      ...brand,
      stats,
    };
  }

  // Products by brand
  async getBrandProducts(slug, query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {
      brandSlug: slug,
      visibility: 'published',
      isActive: true,
    };

    if (query.department) filter.department = query.department;

    if (query.minPrice || query.maxPrice) {
      filter.sellingPrice = {};

      if (query.minPrice)
        filter.sellingPrice.$gte = Number(query.minPrice);

      if (query.maxPrice)
        filter.sellingPrice.$lte = Number(query.maxPrice);
    }

    const sortMap = {
      newest: { createdAt: -1 },
      price_low_high: { sellingPrice: 1 },
      price_high_low: { sellingPrice: -1 },
      discount: { discountPercent: -1 },
      name: { name: 1 },
      featured: { isFeatured: -1, displayOrder: 1 },
      popular: { isBestSeller: -1, createdAt: -1 },
    };

    const sort = sortMap[query.sort] || { createdAt: -1 };

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments(filter);

    return {
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        hasNextPage: page * limit < totalProducts,
        hasPrevPage: page > 1,
      },
    };
  }
}

module.exports = new BrandService();
const Category = require('../models/Category');
const Product = require('../models/Product');


class CategoryService {
  // Full category tree for website mega menu
  async getCategoryTree() {
    const categories = await Category.find({})
      .sort({ level: 1, name: 1 })
      .lean();

    const departments = categories.filter((c) => c.level === 1);
    const parents = categories.filter((c) => c.level === 2);
    const children = categories.filter((c) => c.level === 3);

    return departments.map((department) => ({
      _id: department._id,
      name: department.name,
      slug: department.slug,
      children: parents
        .filter((parent) => parent.parentSlug === department.slug)
        .map((parent) => ({
          _id: parent._id,
          name: parent.name,
          slug: parent.slug,
          children: children
            .filter((child) => child.parentSlug === parent.slug)
            .map((child) => ({
              _id: child._id,
              name: child.name,
              slug: child.slug,
            })),
        })),
    }));
  }

  // Single category by slug
  async getCategoryBySlug(slug) {
    const category = await Category.findOne({ slug }).lean();

    if (!category) return null;

    const breadcrumb = [];

    if (category.rootSlug) {
      const root = await Category.findOne({ slug: category.rootSlug }).lean();
      if (root) breadcrumb.push({ name: root.name, slug: root.slug });
    }

    if (category.parentSlug && category.parentSlug !== category.rootSlug) {
      const parent = await Category.findOne({ slug: category.parentSlug }).lean();
      if (parent) breadcrumb.push({ name: parent.name, slug: parent.slug });
    }

    breadcrumb.push({
      name: category.name,
      slug: category.slug,
    });

    // Count products in this category (department, parent or child)
  const productCount = await Product.countDocuments({
    $or: [
      { department: category.slug },
      { parentCategory: category.slug },
      { childCategory: category.slug },
    ],
    visibility: "published",
    isActive: true,
  });

  // Count child categories
  const childrenCount = await Category.countDocuments({
    parentSlug: category.slug,
  });

    return {
      ...category,
      breadcrumb,
      productCount,
      childrenCount,
    };
  }
}

module.exports = new CategoryService();
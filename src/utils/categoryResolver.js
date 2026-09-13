const categoryMap = require("../migration/categoryMap");

function categoryResolver(categorySlug) {
  const mapping = categoryMap[categorySlug];

  // Category not found
  if (!mapping) {
    return {
      mapped: false,

      department: "uncategorized",
      parent: "uncategorized",

      categorySlug,
      categoryPath: [
        "uncategorized",
        "uncategorized",
        categorySlug,
      ],
    };
  }

  // Category found
  return {
    mapped: true,

    department: mapping.department,
    parent: mapping.parent,

    // This is what Product.childCategory needs
    categorySlug,

    // This is used for breadcrumbs and filters
    categoryPath: [
      mapping.department,
      mapping.parent,
      categorySlug,
    ],
  };
}

module.exports = categoryResolver;
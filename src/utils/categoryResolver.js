const categoryMap = require("../migration/categoryMap");

function categoryResolver(categorySlug) {
  const mapping = categoryMap[categorySlug];

  if (!mapping) {
    return {
      mapped: false,
      department: "uncategorized",
      parent: "uncategorized",
      child: categorySlug,
    };
  }

  return {
    mapped: true,
    ...mapping,
  };
}

module.exports = categoryResolver;
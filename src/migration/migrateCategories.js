require("../config/bootstrap");

async function createCategory(category) {
  const existing = await Category.findOne({
    slug: category.slug,
  });

  if (existing) return existing;

  return Category.create(category);
}

const connectDatabase = require("../config/database");
const getSupplierCategoryModel = require("../models/SupplierCategory");
const Category = require("../models/Category");
const categoryMap = require("./categoryMap");





async function migrateCategories() {
  await connectDatabase();

  const SupplierCategory = await getSupplierCategoryModel();

  const supplierCategories = await SupplierCategory.find({
    supplier: "metrosports",
  }).lean();

  console.log(`📂 Found ${supplierCategories.length} supplier categories`);

  let created = 0;
  let skipped = 0;
  const unmapped = [];

  for (const supplierCategory of supplierCategories) {
    let mapping = null;

    for (const department of Object.values(categoryMap)) {
      for (const parent of Object.values(department.children)) {
        if (parent.children.includes(supplierCategory.slug)) {
          mapping = {
            department,
            parent,
            childSlug: supplierCategory.slug,
          };
        }
      }
    }

    if (!mapping) {
      unmapped.push(supplierCategory.slug);
      continue;
    }

    const root = await createCategory({
      name: mapping.department.name,
      slug: mapping.department.slug,
      level: 1,
      path: [mapping.department.slug],
    });

    const parent = await createCategory({
      name: mapping.parent.name,
      slug: mapping.parent.slug,
      level: 2,
      parentSlug: root.slug,
      rootSlug: root.slug,
      path: [root.slug, mapping.parent.slug],
    });

    const exists = await Category.findOne({
      slug: supplierCategory.slug,
    });

    if (exists) {
      skipped++;
      continue;
    }

    await Category.create({
      name: supplierCategory.name,
      slug: supplierCategory.slug,

      level: 3,

      parentSlug: parent.slug,
      rootSlug: root.slug,

      path: [
        root.slug,
        parent.slug,
        supplierCategory.slug,
      ],

      supplierCategories: [supplierCategory.slug],
    });

    created++;
  }

  console.log("────────────────────────────");
  console.log(`✅ Created : ${created}`);
  console.log(`⏭️ Skipped : ${skipped}`);

  if (unmapped.length) {
    console.log("⚠️ Unmapped Categories");
    console.table(unmapped);
  } else {
    console.log("🎉 All categories mapped.");
  }

  process.exit(0);
}

migrateCategories().catch((error) => {
  console.error(error);
  process.exit(1);
});
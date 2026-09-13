require("../config/bootstrap");

const connectDatabase = require("../config/database");
const Product = require("../models/Product");
const Brand = require("../models/Brand");

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function normalizeBrands() {
  await connectDatabase();

  console.log("🏷️ Normalizing Product Brands...\n");

  const products = await Product.find({}).lean();

  let updated = 0;

  for (const product of products) {
    let brand = (product.brand || "").trim();

    // Remove Unknown brands for website V1
    if (!brand || brand === "Unknown") {
      await Product.updateOne(
        { _id: product._id },
        {
          $set: {
            brand: "Unknown",
            brandSlug: "unknown",
            visibility: "hidden",
          },
        }
      );

      updated++;
      continue;
    }

    await Product.updateOne(
      { _id: product._id },
      {
        $set: {
          brand,
          brandSlug: slugify(brand),
          visibility: "published",
        },
      }
    );

    updated++;
  }

  console.log(`✅ Updated ${updated} products.`);

  // ----------------------------
  // Update Brands Collection
  // ----------------------------

  console.log("\n🔄 Updating Brand Counts...\n");

  const brandStats = await Product.aggregate([
    {
      $match: {
        brand: { $ne: "Unknown" },
      },
    },
    {
      $group: {
        _id: "$brand",
        count: { $sum: 1 },
      },
    },
  ]);

  for (const item of brandStats) {
    await Brand.updateOne(
      { name: item._id },
      {
        $set: {
          slug: slugify(item._id),
          productCount: item.count,
          isActive: true,
        },
      },
      { upsert: true }
    );
  }

  console.table(brandStats);

  console.log("\n🎉 Brand Normalization Complete.");

  process.exit(0);
}

normalizeBrands().catch((err) => {
  console.error(err);
  process.exit(1);
});
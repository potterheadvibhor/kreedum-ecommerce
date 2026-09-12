require("../config/bootstrap");

const connectDatabase = require("../config/database");

const Product = require("../models/Product");
const Brand = require("../models/Brand");

const generateSlug = require("../utils/generateSlug");


async function migrateBrands() {
  await connectDatabase();

  console.log("🏷️ Creating Brands Collection...");

  const brands = await Product.aggregate([
    {
      $match: {
        isActive: true,
      },
    },
    {
      $group: {
        _id: "$brand",
        productCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        productCount: -1,
      },
    },
  ]);

  console.log(`Found ${brands.length} brands`);

  let created = 0;
  let updated = 0;

  for (const brand of brands) {
    const name = brand._id?.trim();

    if (!name) continue;

    const slug = generateSlug(name);

    const result = await Brand.updateOne(
      { slug },
      {
        $set: {
          name,
          slug,

          productCount: brand.productCount,

          featured: name === "Aerofit",

          seo: {
            title: `${name} Sports & Gym Equipment | Kreedum Sports Lucknow`,

            description: `Explore ${name} gym and sports equipment available at Kreedum Sports Lucknow.`,

            keywords: [
              name,
              `${name} Sports`,
              `${name} Gym Equipment`,
              "Lucknow",
              "Kreedum Sports",
            ],
          },
        },
      },
      {
        upsert: true,
      }
    );

    if (result.upsertedCount) created++;
    else updated++;
  }

  console.log("================================");
  console.log("✅ BRAND MIGRATION COMPLETE");
  console.log(`Created : ${created}`);
  console.log(`Updated : ${updated}`);
  console.log("================================");

  process.exit(0);
}

migrateBrands().catch((error) => {
  console.error(error);
  process.exit(1);
});
require("../config/bootstrap");

const connectDatabase = require("../config/database");
const Product = require("../models/Product");

async function enrichProducts() {
  await connectDatabase();

  console.log("✨ Enriching Product Schema...\n");

  const products = await Product.find({});

  let updated = 0;

  for (const product of products) {
    const specs = product.specifications || {};

    await Product.updateOne(
      { _id: product._id },
      {
        $set: {
          highlights: product.highlights || product.features?.slice(0, 4) || [],

          warranty:
            specs["Warranty"] ||
            product.warranty ||
            "",

          maxUserWeight:
            specs["Max User Weight"] ||
            "",

          dimensions:
            specs["Dimensions"] ||
            "",

          weight:
            specs["Weight"] ||
            "",

          countryOfOrigin:
            product.countryOfOrigin || "India",

          badge: product.badge || "",

          isTrending: false,

          displayOrder: 0,

          availabilityMessage:
            "Contact Kreedum Sports for product availability.",

          viewCount: 0,
          enquiryCount: 0,
          popularityScore: 0,

          syncVersion: 1,
        },
      }
    );

    updated++;
  }

  console.log(`✅ Enriched ${updated} products.`);
  process.exit(0);
}

enrichProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});
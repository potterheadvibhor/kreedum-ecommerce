require("../config/bootstrap");

const connectDatabase = require("../config/database");

const Product = require("../models/Product");
const getSupplierProductModel = require("../models/SupplierProduct");

const transformProduct = require("../utils/transformProduct");


const BATCH_SIZE = 100;


async function loadProducts() {
  const SupplierProduct = await getSupplierProductModel();

  const products = await SupplierProduct.find({
    status: "active",
  })
    .sort({ name: 1 })
    .lean();

  console.log(`📦 Active Supplier Products: ${products.length}`);

  return products;
}


async function migrateBatch(products, batchNumber, totalBatches) {
  const operations = [];
  let failed = 0;

  for (const supplierProduct of products) {
    try {
      const ecommerceProduct =
        transformProduct(supplierProduct);

      operations.push({
        updateOne: {
          filter: {
            sourceUrl: ecommerceProduct.sourceUrl,
          },

          update: {
            $set: ecommerceProduct,
          },

          upsert: true,
        },
      });
    } catch (error) {
      failed++;

      console.log(
        `❌ Failed Transform: ${supplierProduct.name}`
      );
    }
  }

  if (!operations.length) {
    return {
      inserted: 0,
      updated: 0,
      failed,
    };
  }

  const result = await Product.bulkWrite(operations);

  console.log(
    `✅ Batch ${batchNumber}/${totalBatches} • New ${result.upsertedCount} • Updated ${result.modifiedCount}`
  );

  return {
    inserted: result.upsertedCount,
    updated: result.modifiedCount,
    failed,
  };
}


async function migrateProducts() {
  await connectDatabase();

  const supplierProducts = await loadProducts();

  const totalProducts = supplierProducts.length;

  const totalBatches = Math.ceil(
    totalProducts / BATCH_SIZE
  );

  let inserted = 0;
  let updated = 0;
  let failed = 0;

  console.log("====================================");
  console.log("🚀 Starting Product Migration");
  console.log(`Products : ${totalProducts}`);
  console.log(`Batch Size : ${BATCH_SIZE}`);
  console.log(`Batches : ${totalBatches}`);
  console.log("====================================");

  for (
    let i = 0;
    i < totalProducts;
    i += BATCH_SIZE
  ) {
    const batch = supplierProducts.slice(
      i,
      i + BATCH_SIZE
    );

    const batchNumber =
      Math.floor(i / BATCH_SIZE) + 1;

    const result = await migrateBatch(
      batch,
      batchNumber,
      totalBatches
    );

    inserted += result.inserted;
    updated += result.updated;
    failed += result.failed;

    const progress = Math.round(
      ((i + batch.length) / totalProducts) * 100
    );

    console.log(
      `📊 Progress ${progress}% (${i + batch.length}/${totalProducts})`
    );
  }

  console.log("====================================");
  console.log("🎉 PRODUCT MIGRATION COMPLETE");
  console.log(`Inserted : ${inserted}`);
  console.log(`Updated : ${updated}`);
  console.log(`Failed : ${failed}`);
  console.log("====================================");

  process.exit(0);
}

migrateProducts().catch((error) => {
  console.error(error);

  process.exit(1);
});
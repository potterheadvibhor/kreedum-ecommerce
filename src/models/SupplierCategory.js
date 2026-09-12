const mongoose = require("mongoose");

let supplierConnection = null;
let SupplierCategory = null;

const supplierCategorySchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: "categories",
  }
);

async function getSupplierCategoryModel() {
  if (SupplierCategory) return SupplierCategory;

  supplierConnection = await mongoose.createConnection(
    process.env.MONGODB_URI,
    {
      dbName: "kreedum_supplier_sync",
    }
  ).asPromise();

  SupplierCategory = supplierConnection.model(
    "SupplierCategory",
    supplierCategorySchema
  );

  return SupplierCategory;
}

module.exports = getSupplierCategoryModel;
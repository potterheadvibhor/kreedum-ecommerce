const mongoose = require("mongoose");
const connectSupplierDatabase = require("../config/supplierDatabase");

let SupplierProductModel = null;

async function getSupplierProductModel() {
  if (SupplierProductModel) return SupplierProductModel;

  const supplierConnection = await connectSupplierDatabase();

  const supplierProductSchema = new mongoose.Schema(
    {},
    {
      strict: false,
      collection: "products",
    }
  );

  SupplierProductModel = supplierConnection.model(
    "SupplierProduct",
    supplierProductSchema
  );

  return SupplierProductModel;
}

module.exports = getSupplierProductModel;
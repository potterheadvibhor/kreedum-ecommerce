require("../config/bootstrap");

const mongoose = require("mongoose");

let supplierConnection = null;

async function connectSupplierDatabase() {
  if (supplierConnection) return supplierConnection;

  supplierConnection = await mongoose.createConnection(
    process.env.MONGODB_URI,
    {
      dbName: "kreedum_supplier_sync",
    }
  ).asPromise();

  console.log("📦 SupplierSync Database Connected");

  return supplierConnection;
}

module.exports = connectSupplierDatabase;
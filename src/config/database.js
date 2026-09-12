const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "KreedumCommerce",
      serverSelectionTimeoutMS: 15000,
    });

    console.log("✅ KreedumCommerce MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDatabase;
/**
 * Generate searchable keywords for Kreedum ecommerce products.
 *
 * Includes:
 * - Product name
 * - Brand
 * - SKU (with and without hyphen)
 * - Category words
 * - Common synonyms
 */

const CATEGORY_SYNONYMS = {
  "commercial-treadmill": [
    "commercial treadmill",
    "treadmill",
    "running machine",
    "gym treadmill",
    "cardio",
  ],

  "domestic-treadmill": [
    "home treadmill",
    "domestic treadmill",
    "running machine",
    "cardio",
  ],

  "semi-commercial-treadmill": [
    "semi commercial treadmill",
    "treadmill",
    "running machine",
  ],

  "spin-bike": [
    "spin bike",
    "exercise bike",
    "cycling machine",
    "cardio bike",
  ],

  "commercial-spin-bikes": [
    "commercial spin bike",
    "spin bike",
    "exercise bike",
  ],

  "elliptical-cross-trainer": [
    "elliptical",
    "cross trainer",
    "orbitrack",
    "cardio machine",
  ],

  "rowing-machines": [
    "rowing machine",
    "rower",
    "cardio rower",
  ],

  "attachments-for-machines": [
    "cable handle",
    "gym attachment",
    "machine attachment",
    "strength accessory",
  ],

  "boxing-and-punching-bags": [
    "boxing bag",
    "punching bag",
    "mma bag",
    "training bag",
  ],

  yoga: [
    "yoga mat",
    "exercise mat",
    "fitness mat",
  ],
};

function tokenize(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function generateKeywords(product) {
  const keywords = new Set();

  // Product name words
  tokenize(product.name).forEach((word) => keywords.add(word));

  // Full product name
  keywords.add(product.name.toLowerCase());

  // Brand
  if (product.brand) {
    keywords.add(product.brand.toLowerCase());
  }

  // SKU
  if (product.sku) {
    const sku = product.sku.toLowerCase();

    keywords.add(sku);
    keywords.add(sku.replace(/-/g, ""));
    keywords.add(sku.replace(/[^a-z0-9]/g, ""));
  }

  // Category synonyms
  const categoryWords =
    CATEGORY_SYNONYMS[product.categorySlug] || [];

  categoryWords.forEach((word) =>
    keywords.add(word.toLowerCase())
  );

  return [...keywords];
}

module.exports = generateKeywords;
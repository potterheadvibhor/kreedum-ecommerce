/**
 * Convert feature strings into specification object.
 */

function extractSpecifications(features = []) {
  const specifications = {};
  const highlights = [];

  for (const feature of features) {
    if (!feature.includes(":")) {
      highlights.push(feature.trim());
      continue;
    }

    const [key, ...valueParts] = feature.split(":");

    const value = valueParts.join(":").trim();

    specifications[key.trim()] = value;

    if (highlights.length < 6) {
      highlights.push(`${key.trim()}: ${value}`);
    }
  }

  return {
    specifications,
    highlights,
  };
}

module.exports = extractSpecifications;
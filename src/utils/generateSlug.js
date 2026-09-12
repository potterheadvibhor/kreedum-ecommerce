/**
 * Generate SEO-friendly slug for Kreedum products.
 *
 * Example:
 * Aerofit AH-01 Aluminium D-Cable Handle
 * -> aerofit-ah-01-aluminium-d-cable-handle
 */

function generateSlug(name = "") {
  return (
    name
      .toLowerCase()

      // Replace "&" with "and"
      .replace(/&/g, " and ")

      // Remove brackets and quotes
      .replace(/[()'"`]/g, "")

      // Replace "/" and "\" with "-"
      .replace(/[\\/]/g, "-")

      // Replace commas, dots, colons etc. with space
      .replace(/[^a-z0-9\s-]/g, " ")

      // Replace multiple spaces/hyphens with single hyphen
      .replace(/[\s-]+/g, "-")

      // Remove leading/trailing hyphen
      .replace(/^-+|-+$/g, "")
  );
}

module.exports = generateSlug;
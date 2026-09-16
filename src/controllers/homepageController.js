const homepageService = require("../services/homepageService");

class HomepageController {

  /**
   * GET /api/v1/homepage
   * Returns complete homepage payload.
   */
  async getHomepage(req, res) {
    try {
      const homepage = await homepageService.getHomepageData();

      return res.status(200).json({
        success: true,
        message: "Homepage data fetched successfully.",
        data: homepage,
      });

    } catch (error) {
      console.error("Homepage API Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch homepage data.",
      });
    }
  }

  /**
   * GET /api/v1/homepage/stats
   * Returns only homepage statistics.
   */
  async getHomepageStats(req, res) {
    try {
      const stats = await homepageService.getHomepageStats();

      return res.status(200).json({
        success: true,
        message: "Homepage statistics fetched successfully.",
        data: stats,
      });

    } catch (error) {
      console.error("Homepage Stats Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch homepage statistics.",
      });
    }
  }

  /**
   * GET /api/v1/homepage/deals
   * Returns today's deals only.
   */
  async getDeals(req, res) {
    try {
      const limit = Number(req.query.limit) || 8;

      const deals = await homepageService.getDeals(limit);

      return res.status(200).json({
        success: true,
        message: "Today's deals fetched successfully.",
        count: deals.length,
        data: deals,
      });

    } catch (error) {
      console.error("Deals API Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch deals.",
      });
    }
  }

  /**
   * GET /api/v1/homepage/featured
   * Returns featured products only.
   */
  async getFeaturedProducts(req, res) {
    try {
      const limit = Number(req.query.limit) || 8;

      const products =
        await homepageService.getFeaturedProducts(limit);

      return res.status(200).json({
        success: true,
        message: "Featured products fetched successfully.",
        count: products.length,
        data: products,
      });

    } catch (error) {
      console.error("Featured API Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch featured products.",
      });
    }
  }
}

module.exports = new HomepageController();
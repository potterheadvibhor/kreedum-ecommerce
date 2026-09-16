const searchService = require("../services/searchService");

class SearchController {

  /**
   * Global Product Search
   * GET /api/v1/search
   */
  async searchProducts(req, res) {
    try {
      const result = await searchService.searchProducts(req.query);

      return res.status(200).json({
        success: true,
        ...result,
      });

    } catch (error) {
      console.error("Search Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to perform product search.",
      });
    }
  }

  /**
   * Search Suggestions (Autocomplete)
   * GET /api/v1/search/suggestions?q=tread
   */
  async getSuggestions(req, res) {
    try {
      const keyword = req.query.q || "";

      const suggestions =
        await searchService.getSuggestions(keyword);

      return res.status(200).json({
        success: true,
        keyword,
        count: suggestions.length,
        suggestions,
      });

    } catch (error) {
      console.error("Suggestion Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch search suggestions.",
      });
    }
  }

  /**
   * Popular Searches
   * GET /api/v1/search/popular
   */
  async getPopularSearches(req, res) {
    try {
      const searches =
        await searchService.getPopularSearches();

      return res.status(200).json({
        success: true,
        count: searches.length,
        searches,
      });

    } catch (error) {
      console.error("Popular Search Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch popular searches.",
      });
    }
  }
}

module.exports = new SearchController();
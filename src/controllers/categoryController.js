const categoryService = require('../services/categoryService');
const productService = require('../services/productService');

class CategoryController {
  async getCategoryTree(req, res) {
    try {
      const categories = await categoryService.getCategoryTree();

      res.status(200).json({
        success: true,
        count: categories.length,
        categories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories.',
      });
    }
  }

  async getCategory(req, res) {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found.',
        });
      }

      res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch category.',
      });
    }
  }

  async getCategoryProducts(req, res) {
    try {

        const category = await categoryService.getCategoryBySlug(req.params.slug);

if (!category) {
  return res.status(404).json({
    success: false,
    message: "Category not found.",
  });
}
      const result = await productService.getProductsByCategory(
        req.params.slug,
        req.query
      );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch category products.',
      });
    }
  }
}

module.exports = new CategoryController();
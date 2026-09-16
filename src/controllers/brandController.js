const brandService = require('../services/brandService');

class BrandController {
  async getBrands(req, res) {
    try {
      const brands = await brandService.getAllBrands();

      return res.status(200).json({
        success: true,
        count: brands.length,
        brands,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch brands.',
      });
    }
  }

  async getBrand(req, res) {
    try {
      const brand = await brandService.getBrandBySlug(req.params.slug);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: 'Brand not found.',
        });
      }

      return res.status(200).json({
        success: true,
        brand,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch brand.',
      });
    }
  }

  async getBrandProducts(req, res) {
    try {
      const brand = await brandService.getBrandBySlug(req.params.slug);

      if (!brand) {
        return res.status(404).json({
          success: false,
          message: 'Brand not found.',
        });
      }

      const result = await brandService.getBrandProducts(
        req.params.slug,
        req.query
      );

      return res.status(200).json({
        success: true,
        brand: {
          name: brand.name,
          slug: brand.slug,
        },
        ...result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch brand products.',
      });
    }
  }
}

module.exports = new BrandController();
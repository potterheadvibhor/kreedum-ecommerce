const orderService = require("../services/orderService");

class OrderController {

  // POST /orders
  async placeOrder(req, res) {
    try {
      const order = await orderService.placeOrder(
        req.user._id,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /orders
  async getMyOrders(req, res) {
    try {
      const orders = await orderService.getMyOrders(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully.",
        data: orders,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /orders/:orderId
  async getOrderDetails(req, res) {
    try {
      const order = await orderService.getOrderDetails(
        req.user._id,
        req.params.orderId
      );

      return res.status(200).json({
        success: true,
        message: "Order fetched successfully.",
        data: order,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PATCH /orders/:orderId/cancel
  async cancelOrder(req, res) {
    try {
      const order = await orderService.cancelOrder(
        req.user._id,
        req.params.orderId
      );

      return res.status(200).json({
        success: true,
        message: "Order cancelled successfully.",
        data: order,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /orders/:orderId/tracking
  async getTrackingTimeline(req, res) {
    try {
      const tracking = await orderService.getTrackingTimeline(
        req.user._id,
        req.params.orderId
      );

      return res.status(200).json({
        success: true,
        message: "Tracking timeline fetched successfully.",
        data: tracking,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
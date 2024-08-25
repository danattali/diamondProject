const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
  getOrderByUserId,
} = require("../controllers/orderController");
router.get("/", getOrders);
router.get("/AllOrders", getAllOrders);
router.get("/OrderByUserId/:id", getOrderByUserId);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrderToPaid);
router.delete("/:id", updateOrderToDelivered);
module.exports = router;

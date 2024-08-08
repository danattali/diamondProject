const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered  } = require('../controllers/orderController');
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrderToPaid);
router.delete('/:id', updateOrderToDelivered);
module.exports = router;


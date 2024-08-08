const Order = require('../models/order');


const createOrder = async (req, res) => {
  const { userId ,items, totalPrice, shippingAddress } = req.body;



  const orderItems = items.map(item => ({
    name: item.name,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    product: item._id,
  }));

  const order = new Order({
    user: userId,
    orderItems: orderItems,
    shippingAddress: {
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.zipCode,
      country: 'Your Country', // Adjust as necessary
    },
    totalPrice: totalPrice,
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ orders });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        else {
            res.status(200).json({ order });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        else {
            order.isPaid = true;
            order.paidAt = Date.now();
            await order.save();
            res.status(200).json({ message: 'Order paid successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        else {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            res.status(200).json({ message: 'Order delivered successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { createOrder, getOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered };
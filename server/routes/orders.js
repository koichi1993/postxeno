const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');

// GET /orders → Get all orders (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

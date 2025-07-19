const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productTitle: String,
  userEmail: String,
  amountPaid: Number,
  stripeSessionId: String,
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

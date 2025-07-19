require('dotenv').config();

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');




const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get product info from metadata
    const productId = session.metadata.productId;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    await Order.create({
      productId: product._id,
      productTitle: product.title,
      userEmail: session.customer_details.email,
      amountPaid: session.amount_total / 100,
      paymentStatus: session.payment_status,
      stripeSessionId: session.id
    });

    console.log('✅ Order stored');
  }

  res.status(200).end();
});

module.exports = router;

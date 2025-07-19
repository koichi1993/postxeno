const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');

// Create Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;

  try {
    // Get product details from DB
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'jpy',
          product_data: {
            name: product.title,
            description: product.description,
            images: [`http://localhost:5000${product.imageUrl}`],
          },
          unit_amount: product.price,
        },
        quantity: 1,
      }],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
      productId: product._id.toString()
  }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create checkout session');
  }
});

module.exports = router;

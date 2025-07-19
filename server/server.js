const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser'); // add this near the top
const path = require('path');
const webhookRoute = require('./routes/webhook');


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());

app.use(express.json()); // still needed for normal routes


// Routes (we'll create them next)
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/checkout', require('./routes/checkout'));
app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoute);
app.use('/orders', require('./routes/orders'));
app.use('/newsletter', require('./routes/newsletter'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

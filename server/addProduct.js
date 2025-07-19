const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

async function addProduct() {
  await mongoose.connect(process.env.MONGO_URI);
  
  await Product.create({
    title: 'Test Product',
    description: 'This is a demo product.',
    imageUrl: 'https://via.placeholder.com/300x200',
    price: 49.99
  });

  console.log('✅ Product added');
  mongoose.disconnect();
}

addProduct();

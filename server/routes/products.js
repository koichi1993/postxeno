const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });



// 🟢 Public: Get all products
router.get('/', async (req, res) => {
  const sort = req.query.sort === 'desc' ? -1 : 1;

  try {
    const products = await Product.find().sort({ price: sort });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



// 🔐 Admin: Create a product (protected)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {

  const { title, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';


  if (!title || !price) {
    return res.status(400).json({ message: 'Title and price are required' });
  }

  try {
    const newProduct = new Product({ title, description, imageUrl, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// 🔐 Admin: Delete a product (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 🟢 Public: Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;

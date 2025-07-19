// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash('Password123', 10);

    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin created');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
};

createAdmin();

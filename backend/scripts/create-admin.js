// scripts/create-admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@slt.lk' });
    
    if (adminExists) {
      console.log('Admin user already exists');
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = new User({
        name: 'Admin User',
        email: 'admin@slt.lk',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      console.log('Admin created successfully');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdmin();
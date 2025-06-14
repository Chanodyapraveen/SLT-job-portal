// Create this as scripts/reset-admin.js in your backend folder
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Find and remove existing admin
    await User.deleteOne({ email: 'admin@slt.lk' });
    
    // Create new admin with known password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@slt.lk',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin user reset successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

resetAdmin();
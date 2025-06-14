const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working' });
});

// Logout route
router.get('/logout', (req, res) => {
    res.redirect('/');
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt with:', { email });
  
  try {
    // Find the user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found:', user.email);
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Authentication successful');
    
    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Render the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle redirects for admin job creation
router.get('/admin/job-creation', (req, res) => {
  res.render('job-creation');
});

// Database status route
router.get('/db-status', (req, res) => {
  const status = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  res.json({ status, connected: status === 1 });
});

module.exports = router;
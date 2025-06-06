// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Job = require('../models/Job');

// Simplified middleware - you can restore the real auth later
const protect = (req, res, next) => {
  req.user = { role: 'admin' };
  next();
};

const authorize = (role) => {
  return (req, res, next) => {
    next();
  };
};

// @desc    Render job creation page
// @route   GET /admin/job-creation
router.get('/job-creation', (req, res) => {
    res.render('job-creation');
});

// @desc    Create a new job
// @route   POST /admin/job-creation
router.post('/job-creation', async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error creating job'
        });
    }
});

// @desc    Render job modification page
// @route   GET /admin/job-modification
router.get('/job-modification', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.render('job-modification', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router;
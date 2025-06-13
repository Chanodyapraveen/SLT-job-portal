// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const Job = require('../models/Job');

// @desc    Render job creation page
// @route   GET /admin/job-creation
// @access  Private (Admin only)
router.get('/job-creation', protect, authorize('admin'), (req, res) => {
    res.render('job-creation');
});

// @desc    Create a new job
// @route   POST /admin/job-creation
// @access  Private (Admin only)
router.post('/job-creation', protect, authorize('admin'), async (req, res) => {
    try {
        const {
            jobId,
            jobField,
            jobPosition,
            contactNumber,
            background,
            salary,
            dueDate,
            companyEmail,
            companyLocation,
            workType,
            jobDescription
        } = req.body;

        // Create new job
        const job = await Job.create({
            jobId,
            jobField,
            jobPosition,
            contactNumber,
            background,
            salary,
            dueDate,
            companyEmail,
            companyLocation,
            workType,
            jobDescription,
            createdBy: req.user.id,
            status: 'Active'
        });

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
// @access  Private (Admin only)
router.get('/job-modification', protect, authorize('admin'), async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.render('job-modification', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// Export the router
module.exports = router;
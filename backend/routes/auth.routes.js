const express = require('express');
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working' });
});

// Logout route
router.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;
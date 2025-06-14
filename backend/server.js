const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
// Import the auth middleware
const { protect } = require('./middleware/auth.middleware');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// CORS options to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Routes
app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/admin', require('./routes/admin.routes'));

// Add this route to check authentication
app.get('/api/auth/check', protect, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Serve the login page for unauthenticated users
app.get('/', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
      app.listen(PORT + 1, () => console.log(`Server running on port ${PORT + 1}`));
    } else {
      console.error(err);
    }
  });
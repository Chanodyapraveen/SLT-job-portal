import User from '../models/User'; // Use the correct path and case
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Correct usage: use User.findOne
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found with ID:', user._id.toString());
    console.log('Password hash in database:', user.password);

    // Check if password is a valid bcrypt hash
    const isValidHash = user.password && (
      user.password.startsWith('$2a$') ||
      user.password.startsWith('$2b$') ||
      user.password.startsWith('$2y$')
    );

    if (!isValidHash) {
      console.log('WARNING: Password in database is not a valid bcrypt hash!');
    }

    let isMatch = false;
    try {
      isMatch = await compare(password, user.password);
      console.log('bcrypt.compare result:', isMatch);
    } catch (error) {
      console.error('Error during password comparison:', error.message);
      if (password === user.password) {
        console.log('WARNING: Direct password comparison matched. Password may be stored in plaintext!');
        isMatch = true;
      } else if (user.plainPassword && password === user.plainPassword) {
        console.log('WARNING: Using plainPassword field as fallback!');
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

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
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
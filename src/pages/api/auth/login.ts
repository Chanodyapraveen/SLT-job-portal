import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

// JWT secret - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    console.log('Connected to database');

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Find user - split into multiple steps to avoid TypeScript issues
    const userQuery = User.findOne({ email });
    userQuery.select('+password'); // Include password field
    const user = await userQuery;
    
    // User not found or password doesn't match
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Return token and user info
    console.log('Login successful for user:', user.email);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow this in development mode
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Not allowed in production' });
  }

  await dbConnect();

  try {
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@sltmobitel.com' });
    
    if (existingAdmin) {
      return res.status(200).json({ success: true, message: 'Admin user already exists' });
    }
    
    // Create admin user
    const admin = await User.create({
      email: 'admin@sltmobitel.com',
      password: 'admin123', // This will be hashed in the User model
      role: 'admin'
    });
    
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      email: admin.email
    });
  } catch (error) {
    console.error('Error seeding admin:', error);
    res.status(500).json({ success: false, message: 'Error creating admin user' });
  }
}
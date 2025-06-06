import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Application from '../../../models/Application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'POST':
      try {
        // Set the initial status to 'pending'
        const applicationData = {
          ...req.body,
          status: 'pending',
          applicationId: 'SLT-' + 
            Math.random().toString(36).substring(2, 5).toUpperCase() + 
            Date.now().toString().substring(9, 13)
        };
        
        const application = await Application.create(applicationData);
        
        res.status(201).json({ 
          success: true, 
          data: application,
          applicationId: application.applicationId 
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Application from '../../../models/Application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  
  const { method, query } = req;
  
  switch (method) {
    case 'GET':
      try {
        // Filter by status if provided
        const filter = query.status ? { status: query.status } : {};
        
        const applications = await Application.find(filter)
          .sort({ createdAt: -1 })
          .select('jobTitle nameWithInitials gender field contactNumber resumeUrl');
          
        res.status(200).json({ 
          success: true, 
          data: applications.map(app => ({
            id: app._id,
            jobTitle: app.jobTitle,
            nameWithInitials: app.nameWithInitials,
            gender: app.gender,
            field: app.field,
            contactNumber: app.contactNumber,
            resumeUrl: app.resumeUrl
          }))
        });
      } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch applications' });
      }
      break;
      
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
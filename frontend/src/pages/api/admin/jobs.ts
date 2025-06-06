import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Job from '../../../models/Job';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  
  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to fetch jobs' });
      }
      break;
      
    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedJob = await Job.findByIdAndDelete(id);
        
        if (!deletedJob) {
          return res.status(404).json({ success: false, error: 'Job not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Failed to delete job' });
      }
      break;
      
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
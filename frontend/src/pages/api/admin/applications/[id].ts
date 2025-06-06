import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import Application from '../../../../models/Application';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const application = await Application.findByIdAndUpdate(
          id,
          { status: req.body.status },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!application) {
          return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, data: application });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
          return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
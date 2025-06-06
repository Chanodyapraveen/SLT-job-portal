import type { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth } from '../../../utils/authMiddleware';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // This endpoint is protected by withAdminAuth
  // If we reach here, the token is valid and the user is an admin
  res.status(200).json({ success: true, message: 'Token is valid' });
};

export default withAdminAuth(handler);
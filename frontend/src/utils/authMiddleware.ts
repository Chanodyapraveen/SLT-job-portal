import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
}

export function withAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }
      
      // Add user to request object
      (req as any).user = decoded;
      
      // Continue to the API handler
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Authentication error' });
    }
  };
}

export function withAdminAuth(handler: any) {
  return withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = (req as any).user;
    
    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    // Continue to the API handler
    return handler(req, res);
  });
}
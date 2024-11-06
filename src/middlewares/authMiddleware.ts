import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const defaultJWT = '637ee644d0c61df577eda14d1eed28e4cc12fa2cee3824da3dbae36c869664e5486a000f1a240bd78632d3705d9889ba5d74e67680cdc803581b8a219b127ffb';
const JWT_SECRET = process.env.JWT_SECRET || defaultJWT;

export interface AuthRequest extends Request {
  user?: any | JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    // decoding token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;  
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
    return;
  }
};

import jwtToken from './jwtToken';
import { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
  email: string;
}

export const authJwt = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok) {
      req.email = result.email || '';
      next();
    }
  }
  next();
};

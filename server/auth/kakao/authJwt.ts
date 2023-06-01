import jwtToken, { TOKEN_EXPIRED } from './jwtToken';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line consistent-return
export const authKakaoJwt = (req: any, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      req.userId = result.userId;
      next();
    } else {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ msg: 'token_expired' });
    }
  } else {
    return res.status(400).json({ msg: 'Cannot find token' });
  }
};

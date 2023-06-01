import jwtToken, { TOKEN_EXPIRED } from './jwtToken';
import express, { NextFunction, Response } from 'express';

const router = express.Router();

router.use((req: any, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      req.userId = result.userId;
      next();
    } else if (!result.ok && result.error === TOKEN_EXPIRED) {
      res.status(401).json({ msg: 'token_expired' });
    } else {
      res.status(401).json({ msg: 'Invalid token' });
    }
  } else {
    res.status(400).json({ msg: 'Cannot find token' });
  }
});

export default router;

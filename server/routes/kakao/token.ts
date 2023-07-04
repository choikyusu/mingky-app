import express from 'express';
import jwtToken from '../../auth/kakao/jwtToken';
import { NotFindTokenError } from '@/server/Error/NotFindTokenError';

const router = express.Router();

router.get('/refresh', async (req, res) => {
  if (!req.headers.authorization)
    throw new NotFindTokenError('Cannot find token');

  if (
    typeof req.headers.authorization !== 'string' ||
    typeof req.headers.refresh !== 'string'
  )
    throw new NotFindTokenError('Cannot find token');

  const token = req.headers.authorization.split('Bearer ')[1];
  const { refresh } = req.headers;
  const result = jwtToken.verify(token);
  if (result.userId) {
    const refreshResult = await jwtToken.refreshVerify(refresh, result.userId);
    if (refreshResult) {
      const newToken = await jwtToken.sign(result.userId);
      res.json({ data: newToken, msg: '신규발급' });
    }
  }
});

export default router;

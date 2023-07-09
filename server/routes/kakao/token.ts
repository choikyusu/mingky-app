import express from 'express';
import jwtToken from '../../auth/kakao/jwtToken';
import { NotFindTokenError } from '../../Error/NotFindTokenError';
import { ExpiredTokenError } from '../../Error/ExpiredTokenError';
import { NotFindUserError } from '../../Error/NotFindUserError';

const router = express.Router();

router.get('/refresh', async (req, res, next) => {
  if (!req.headers.authorization)
    return next(new NotFindTokenError('Cannot find token'));

  if (
    typeof req.headers.authorization !== 'string' ||
    typeof req.headers.refresh !== 'string'
  )
    return next(new NotFindTokenError('Cannot find token'));

  const token = req.headers.authorization.split('Bearer ')[1];
  const { refresh } = req.headers;
  const result = jwtToken.verify(token);
  if (!result.userId)
    return next(new NotFindUserError('사용자 정보를 찾지 못했습니다.'));

  const refreshResult = await jwtToken.refreshVerify(refresh, result.userId);
  if (!refreshResult) return next(new ExpiredTokenError('token_expired'));

  const newToken = await jwtToken.sign(result.userId);
  return res.json({ data: newToken, msg: '신규발급' });
});

export default router;

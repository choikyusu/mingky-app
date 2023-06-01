import express from 'express';
import jwtToken from '../../auth/kakao/jwtToken';

const router = express.Router();

router.get('/refresh', async (req, res) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string' &&
    typeof req.headers.refresh === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const { refresh } = req.headers;
    const result = jwtToken.verify(token);
    if (result.userId) {
      const refreshResult = await jwtToken.refreshVerify(
        refresh,
        result.userId,
      );
      if (refreshResult) {
        const newToken = await jwtToken.sign(result.userId);
        res.json({ data: newToken, msg: '신규발급' });
      }
    }
  } else {
    res.status(400).json({ msg: 'Cannot find token' });
  }
});

export default router;

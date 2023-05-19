/* eslint-disable camelcase */
import * as express from 'express';
import { User } from '../../schemas/kakao/user';
import jwtToken from '../../auth/kakao/jwtToken';

const router = express.Router();

router.get('/me', async (req: any, res) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      const user = await User.findOne({ user_id: result.userId });
      if (user)
        return res.json({
          data: {
            userId: user.user_id,
            name: user.name,
            message: user.message,
            baseUrl: user.base_profile,
            backgroundUrl: user.base_background,
          },
        });
    }
  }
  return res.status(500).json({ msg: '사용자 정보를 찾지 못했습니다.' });
});

export default router;

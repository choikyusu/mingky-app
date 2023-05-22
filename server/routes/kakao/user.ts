/* eslint-disable camelcase */
import * as express from 'express';
import { User } from '../../schemas/kakao/user';
import jwtToken, { TOKEN_EXPIRED } from '../../auth/kakao/jwtToken';

const router = express.Router();

router.get('/profile/me', async (req: any, res) => {
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
            nickName: user.nick_name,
            message: user.message,
            baseUrl: user.base_profile,
            backgroundUrl: user.base_background,
          },
        });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ data: false, msg: 'token_expired' });
    }
  }
  return res.status(500).json({ msg: '사용자 정보를 찾지 못했습니다.' });
});

router.post('/profile/change', async (req, res) => {
  const { body } = req;
  try {
    if (
      req.headers.authorization &&
      typeof req.headers.authorization === 'string'
    ) {
      const token = req.headers.authorization.split('Bearer ')[1];
      const result = jwtToken.verify(token);
      if (result.ok && result.userId) {
        await User.updateOne(
          { user_id: result.userId },
          {
            nick_name: body.nick_name,
            message: body.message,
            base_profile: body.base_url,
            base_background: body.background_url,
          },
        );
        return res.json({ data: true, msg: '프로필 변경 완료.' });
      }
      if (!result.ok && result.error === TOKEN_EXPIRED) {
        return res.status(401).json({ data: false, msg: 'token_expired' });
      }
    }
  } catch (err: any) {
    return res.status(400).json({ data: false, msg: err.message });
  }
  return res
    .status(400)
    .json({ data: false, msg: '프로필을 변경 못했습니다.' });
});

export default router;

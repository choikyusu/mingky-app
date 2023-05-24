/* eslint-disable camelcase */
import * as express from 'express';
import { User } from '../../schemas/kakao/user';
import jwtToken, { TOKEN_EXPIRED } from '../../auth/kakao/jwtToken';
import multer from 'multer';
import path from 'path';

const dest = path.join(__dirname, '../../kakaotalk/uploads/');
const upload = multer({ dest });
const router = express.Router();

router.get('/:userId', async (req, res) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      const { userId } = req.params;
      try {
        const user = await User.findOne({ userId }).select(
          'userId name nickName message profileUrl backgroundUrl',
        );
        if (user) {
          return res.json({
            data: {
              userId: user.userId,
              name: user.name,
              nickName: user.nickName,
              message: user.message,
              profileUrl: user.profileUrl,
              backgroundUrl: user.backgroundUrl,
            },
          });
        }
        return res.json({
          data: null,
        });
      } catch (err) {
        return res.status(500).json({
          msg: '서버 문제로 인해 찾을 수 없습니다.',
        });
      }
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ data: false, msg: 'token_expired' });
    }
  }
  return res.status(500).json({ msg: '사용자 정보를 찾지 못했습니다.' });
});

router.get('/profile/me', async (req: any, res) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      const user = await User.findOne({ userId: result.userId })
        .select(
          'userId name nickName message profileUrl backgroundUrl friendList',
        )
        .populate({
          path: 'friendList',
          select: 'nickName message profileUrl backgroundUrl',
        });
      if (user)
        return res.json({
          data: {
            userId: user.userId,
            name: user.name,
            nickName: user.nickName,
            message: user.message,
            profileUrl: user.profileUrl,
            backgroundUrl: user.backgroundUrl,
            friendList: user.friendList,
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
          { userId: result.userId },
          {
            nickName: body.nickName,
            message: body.message,
            profileUrl: body.profileUrl,
            backgroundUrl: body.backgroundUrl,
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

router.post('/profile/upload', upload.single('image'), (req, res) => {
  try {
    const image = req.file as Express.Multer.File;
    return res.json({ data: `uploads\\${image.filename}` });
  } catch (err: any) {
    return res.status(400).json({ msg: err.message });
  }
});

export default router;

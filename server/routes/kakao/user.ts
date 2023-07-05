import express from 'express';
import { User } from '../../schemas/kakao/user';
import { NotFindUserError } from '../../Error/NotFindUserError';

const router = express.Router();

router.get('/:userId', async (req: any, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ userId }).select(
    'userId name nickName message profileUrl backgroundUrl',
  );
  if (!user) throw new NotFindUserError('사용자 정보를 찾지 못했습니다.');

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
});

router.get('/profile/me', async (req: any, res) => {
  const { userId } = req;
  const user = await User.findOne({ userId })
    .select('userId name nickName message profileUrl backgroundUrl friendList')
    .populate({
      path: 'friendList',
      select: 'userId nickName message profileUrl backgroundUrl',
    });

  if (!user) throw new NotFindUserError('사용자 정보를 찾지 못했습니다.');

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
});

router.post('/profile/change', async (req: any, res) => {
  const { body, userId } = req;
  const user = await User.findOne({ userId });

  if (!user) throw new NotFindUserError('사용자 정보를 찾지 못했습니다.');

  await User.updateOne(
    { userId },
    {
      nickName: body.nickName,
      message: body.message,
      profileUrl: body.profileUrl,
      backgroundUrl: body.backgroundUrl,
    },
  );
  return res.json({ data: true, msg: '프로필 변경 완료.' });
});

export default router;

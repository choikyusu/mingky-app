import express from 'express';
import { User } from '../../schemas/kakao/user';

const router = express.Router();

router.post('/add', async (req: any, res) => {
  const { body, userId } = req;

  if (userId === body.friendId)
    return res.status(400).json({ msg: 'Cannot add yourself as a friend' });

  const user = await User.findOne({ userId });
  const friend = await User.findOne({ userId: body.friendId });
  if (user && friend) {
    if (!user.friendList.includes(friend._id)) {
      await User.updateOne(
        { userId },
        {
          friendList: [...user.friendList, friend._id],
        },
      );
      return res.json({ data: true, msg: '친구 추가' });
    }
    return res.status(409).json({ msg: 'Friend already added' });
  }
  return res.status(404).json({ msg: 'cannot add friend' });
});

export default router;

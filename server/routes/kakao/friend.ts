import express from 'express';
import { User } from '../../schemas/kakao/user';
import { CannotAddFriendError } from '@/server/Error/CannotAddFriendError';
import { NotFindUserError } from '@/server/Error/NotFindUserError';
import { AlreadExistFriendError } from '@/server/Error/AlreadExistFriendError';

const router = express.Router();

router.post('/add', async (req: any, res) => {
  const { body, userId } = req;

  if (userId === body.friendId)
    throw new CannotAddFriendError('Cannot add yourself as a friend');

  const user = await User.findOne({ userId });
  const friend = await User.findOne({ userId: body.friendId });

  if (!user || !friend) throw new NotFindUserError('cannot add friend');
  if (user.friendList.includes(friend._id))
    throw new AlreadExistFriendError('Friend already added');

  await User.updateOne(
    { userId },
    {
      friendList: [...user.friendList, friend._id],
    },
  );
  return res.json({ data: true, msg: '친구 추가' });
});

export default router;

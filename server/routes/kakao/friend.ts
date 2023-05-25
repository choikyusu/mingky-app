import express from 'express';
import jwtToken, { TOKEN_EXPIRED } from '../../auth/kakao/jwtToken';
import { User } from '../../schemas/kakao/user';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { body } = req;
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      if (result.userId === body.friendId)
        return res.status(400).json({ msg: 'Cannot add yourself as a friend' });

      const user = await User.findOne({ userId: result.userId });
      const friend = await User.findOne({ userId: body.friendId });
      if (user && friend) {
        if (!user.friendList.includes(friend._id)) {
          await User.updateOne(
            { userId: result.userId },
            {
              friendList: [...user.friendList, friend._id],
            },
          );
          return res.json({ data: true, msg: '친구 추가' });
        }
        return res.status(409).json({ msg: 'Friend already added' });
      }
      return res.status(404).json({ msg: 'cannot add friend' });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ msg: 'token_expired' });
    }
  }
  return res.status(400).json({ msg: 'cannot find token' });
});

export default router;

import express from 'express';
import jwtToken, { TOKEN_EXPIRED } from '../../auth/kakao/jwtToken';
import { Friend } from '../../schemas/kakao/friend';

const router = express.Router();

router.get('/list', async (req, res) => {
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      const friendList = await Friend.findOne({ user_id: result.userId });
      if (friendList) {
        return res.json({
          data: {
            user_id: friendList.user_id,
            friend_list: friendList.friend_list,
          },
        });
      }
      return res.json({
        data: {
          user_id: result.userId,
          friend_list: [],
        },
      });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ msg: 'token_expired' });
    }
  }
  return res.status(400).json({ msg: 'cannot find token' });
});

router.post('/add', async (req, res) => {
  const { body } = req;
  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      if (result.userId === body.friend_id)
        return res.status(400).json({ msg: 'Cannot add yourself as a friend' });

      const user = await Friend.findOne({ user_id: result.userId });
      if (user) {
        if (!user.friend_list.includes(body.friend_id)) {
          await Friend.updateOne(
            { user_id: result.userId },
            {
              friend_list: [...user.friend_list, body.friend_id],
            },
          );
          return res.json({ data: true, msg: '친구 추가' });
        }
        return res.status(409).json({ msg: 'Friend already added' });
      }
      await Friend.create(
        { user_id: result.userId },
        {
          friend_list: [body.friend_id],
        },
      );
      return res.json({ data: true, msg: '친구 추가' });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ msg: 'token_expired' });
    }
  }
  return res.status(400).json({ msg: 'cannot find token' });
});

export default router;

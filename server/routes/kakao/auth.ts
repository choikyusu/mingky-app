/* eslint-disable camelcase */
import * as express from 'express';
import { User } from '../../schemas/kakao/user';
import jwtToken from '../../auth/kakao/jwtToken';
import { createHashedPassword, verifyPassword } from '../../utils/crypto.util';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });

    if (user) {
      if (await verifyPassword(password, user.salt, user.hashedPassword)) {
        const token = await jwtToken.sign(user);
        const refreshToken = jwtToken.refresh();
        return res.json({ data: { token, refreshToken }, msg: '로그인 성공!' });
      }
    }
    return res
      .status(404)
      .json({ msg: '계정 또는 비밀번호를 다시 확인해주세요.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: '로그인 실패' });
  }
});

router.post('/signup', async (req, res) => {
  const { userId, password, name } = req.body;

  try {
    const user = await User.findOne({
      userId,
    });
    if (user) {
      return res
        .status(400)
        .json({ msg: '이미 사용중이거나 탈퇴한 아이디입니다.' });
    }

    const { hashedPassword, salt } = await createHashedPassword(password);

    await User.create({
      userId,
      hashedPassword,
      salt,
      name,
      nickName: name,
      profileUrl: '',
      backgroundUrl: '',
      message: '',
      friendList: [],
    });
    return res.json({
      msg: '회원가입 되었습니다.',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: '회원가입 실패',
    });
  }
});

export default router;

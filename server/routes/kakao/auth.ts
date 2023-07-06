/* eslint-disable camelcase */
import * as express from 'express';
import { User } from '../../schemas/kakao/user';
import jwtToken from '../../auth/kakao/jwtToken';
import { createHashedPassword, verifyPassword } from '../../utils/crypto.util';
import { redisClient } from '../../utils/cache';
import { WrongLoginInfoError } from '../../Error/WrongLoginInfoError';
import { LoginError } from '../../Error/LoginError';
import { DuplicatedAccountError } from '../../Error/DuplicatedAccountError';
import { SingupError } from '../../Error/SingupError';
import { logger } from '../../logger/logger';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });

    if (!user || !user.userId)
      throw new WrongLoginInfoError('계정 또는 비밀번호를 다시 확인해주세요.');

    if (!(await verifyPassword(password, user.salt, user.hashedPassword)))
      throw new WrongLoginInfoError('계정 또는 비밀번호를 다시 확인해주세요.');

    const token = await jwtToken.sign(user.userId);
    const refreshToken = jwtToken.refresh();
    redisClient.set(user.userId, refreshToken);
    return res.json({ data: { token, refreshToken }, msg: '로그인 성공!' });
  } catch (err) {
    logger.info(err);
    throw new LoginError('로그인 실패');
  }
});

router.post('/signup', async (req, res) => {
  const { userId, password, name } = req.body;

  try {
    const user = await User.findOne({
      userId,
    });
    if (user)
      throw new DuplicatedAccountError(
        '이미 사용중이거나 탈퇴한 아이디입니다.',
      );

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
    throw new SingupError('회원가입 실패');
  }
});

export default router;

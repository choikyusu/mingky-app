import express from 'express';
import chatRouter from './chat';
import imageRouter from './image';
import tokenRouter from './token';
import authRouter from './auth';
import kakaoUserRouter from './user';
import kakaoFriendRouter from './friend';
import uploadRouter from './upload';
import authKakaoJwt from '../../auth/kakao/authJwt';

const router = express.Router();

router.use('/kakaotalk/uploads', uploadRouter);

router.use('/api/kakao/image', imageRouter);
router.use('/api/kakao/token', tokenRouter);
router.use('/api/kakao/chat', authKakaoJwt, chatRouter);
router.use('/api/kakao/auth', authRouter);
router.use('/api/kakao/user', authKakaoJwt, kakaoUserRouter);
router.use('/api/kakao/friend', authKakaoJwt, kakaoFriendRouter);

export default router;

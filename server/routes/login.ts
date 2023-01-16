import express, { NextFunction } from 'express';
import passport from 'passport';

import { naver } from '../passport/index';

naver();
const router = express.Router();

/* 로그인 유저 판단 로직 */
// const isAuthenticated = function (req, res, next: NextFunction) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// };

// naver 로그인
router.get(
  '/login/naver',
  passport.authenticate('naver', { authType: 'reprompt' }),
);
// naver 로그인 연동 콜백
router.get(
  '/naver/login/callback',
  passport.authenticate('naver', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;

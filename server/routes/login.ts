import express, { NextFunction } from 'express';
import passport from 'passport';
import url from 'url';
import { naver } from '../passport/index';
import { jwtToken } from '../auth/jwtToken';

naver();
const router = express.Router();

// naver 로그인
router.get(
  '/login/naver',
  passport.authenticate('naver', { authType: 'reprompt' }),
);
// naver 로그인 연동 콜백
router.get('/naver/login/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    console.log('passport.authenticate(naver)실행');
    if (!user) {
      res.redirect('http://localhost:3000/login');
    } else {
      req.logIn(user, async function (err) {
        const token = await jwtToken.sign(user);

        const tokenString = JSON.stringify(token);
        res.redirect(
          url.format({
            pathname: 'http://localhost:3000/socialresult',
            query: { tokenString },
          }),
        );
      });
    }
  })(req, res);
});

export default router;

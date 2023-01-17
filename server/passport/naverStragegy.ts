import passport from 'passport';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from 'passport-naver-v2';

import { User } from '../schemas/user';

export const naverStragegy = () =>
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/naver/login/callback', // ?? 이것이 어떤 역할을 하는가?
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: NaverProfile,
        done: any,
      ) {
        try {
          const exUser = await User.findOne({
            // 네이버 플랫폼에서 로그인 했고 & snsId필드에 네이버 아이디가 일치할경우
            where: { snsId: profile.id, provider: 'naver' },
          });
          // 이미 가입된 네이버 프로필이면 성공
          if (exUser) {
            done(null, exUser);
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile.email,
              name: profile.name,
              snsId: profile.id,
              gender: profile.gender,
              mobile: profile.mobile,
              birthYear: profile.birthYear,
              provider: 'naver',
              accessToken,
              refreshToken,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );

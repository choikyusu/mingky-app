import passport from 'passport';
import { naverStragegy } from './naverStragegy';
import { User } from '../schemas/user';

export const naver = () => {
  naverStragegy();

  /* 로그인 성공시 사용자 정보를 Session에 저장한다 */
  passport.serializeUser(function (user, done) {
    const serializedUser = user as any;
    // console.log('serializeUser', serializedUser);
    done(null, serializedUser.snsId);
  });

  /* 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴. */
  passport.deserializeUser(function (id, done) {
    // console.log('deserializeUser', id);
    User.findOne({ where: { snsId: id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
};

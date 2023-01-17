import jwt from 'jsonwebtoken';
import randToken from 'rand-token';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export const jwtToken = {
  sign: async (user: any) => {
    const payload = {
      email: user.email,
    };
    const secretKey = process.env.SECRET_KEY;
    if (secretKey) {
      const result = {
        // sign메소드를 통해 access token 발급!
        token: jwt.sign(payload, secretKey, {
          algorithm: 'HS256', // 해싱 알고리즘
          expiresIn: '30m', // 토큰 유효 기간
          issuer: 'issuer', // 발행자
        }),
        refreshToken: randToken.uid(256),
      };

      return result;
    }
    return '';
  },
  verify: async (token: string) => {
    let decoded;
    try {
      const secretKey = process.env.SECRET_KEY;
      if (secretKey) decoded = jwt.verify(token, secretKey);
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      }
      if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      }
      console.log('invalid token');
      return TOKEN_INVALID;
    }
    return decoded;
  },
};

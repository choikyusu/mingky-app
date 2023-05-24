import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { redisClient } from '../../utils/cache';

interface AuthPayload {
  userId: string;
}

export const TOKEN_EXPIRED = -3;
export const TOKEN_INVALID = -2;

export default {
  sign: async (user: any) => {
    const payload = {
      userId: user.userId,
    };
    const secretKey = process.env.SECRET_KEY;
    if (secretKey) {
      return jwt.sign(payload, secretKey, {
        algorithm: 'HS256', // 해싱 알고리즘
        expiresIn: '30m', // 토큰 유효 기간
        issuer: 'issuer', // 발행자
      });
    }
    return '';
  },
  verify: (token: string) => {
    try {
      const secretKey = process.env.SECRET_KEY;
      if (secretKey) {
        const decoded = jwt.verify(
          token.trim(),
          secretKey.trim(),
        ) as AuthPayload;
        return {
          ok: true,
          userId: decoded.userId,
        };
      }
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return {
          ok: false,
          error: TOKEN_EXPIRED,
        };
      }
      if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return {
          ok: false,
          error: TOKEN_INVALID,
        };
      }
      console.log('invalid token');
      return {
        ok: false,
        error: TOKEN_INVALID,
      };
    }

    return {
      ok: false,
      error: 'unknown',
    };
  },
  refresh: () => {
    // refresh token 발급
    const secretKey = process.env.SECRET_KEY;
    if (secretKey) {
      return jwt.sign({}, secretKey, {
        // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '14d',
      });
    }
    return '';
  },
  refreshVerify: async (token: string, userId: any) => {
    const secretKey = process.env.SECRET_KEY;
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
      const data = await getAsync(userId); // refresh token 가져오기
      if (token === data) {
        try {
          if (secretKey) {
            jwt.verify(token, secretKey);
            return true;
          }
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }

    return false;
  },
};

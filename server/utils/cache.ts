import { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';

const redisClient = createClient({ legacyMode: true });

redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', err => {
  console.error('Redis Client Error', err);
});

redisClient.connect().then();

export const set = (key: string, value: string) => {
  redisClient.set(key, JSON.stringify(value));
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;

  const data = await redisClient.get(key);

  if (data) {
    console.log('data from redis!');
    res.status(200).send({
      ok: true,
      data: JSON.parse(data),
    });
  } else {
    next();
  }
};

export { redisClient };

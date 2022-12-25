import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const { MONGODB_URI } = process.env;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function,
) => {
  if (!global.mongoose) {
    global.mongoose = await mongoose.connect(
      'mongodb://gschoi:1234@localhost:27017/admin',
    );

    console.log('mongoose connect', global.mongoose);
  }
  return next();
};

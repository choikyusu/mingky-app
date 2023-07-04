import express, { RequestHandler } from 'express';

import eventsRouter from './events';
import userRouter from './user';
import uploadRouter from './upload';
import blogRouter from './blog';
import loginRouter from './login';
import { authJwt } from '../auth/authJwt';

const router = express.Router();

router.use('/api/events', eventsRouter);
router.use('/api/user', authJwt as RequestHandler, userRouter);
router.use('/api/upload', uploadRouter);
router.use('/api/blog', blogRouter);
router.use('/auth', loginRouter);

export default router;

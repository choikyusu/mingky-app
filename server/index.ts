import express, { RequestHandler } from 'express';
import Next from 'next';
import connect from './schemas';
import path from 'path';
import authRouter from './routes/kakao/auth';
import eventsRouter from './routes/events';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';
import blogRouter from './routes/blog';
import loginRouter from './routes/login';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import { authJwt } from './auth/authJWT';

require('dotenv').config();

const rootDir = path.resolve('./');
const { NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

const nextJsEnabled = true;

const nextJs = Next({ dev });
const nextJsRequestHandler = nextJs.getRequestHandler();

(async () => {
  try {
    if (nextJsEnabled) await nextJs.prepare();

    connect();

    const app = express();

    app.use(
      express.json({
        limit: '5mb',
      }),
    );
    app.use(
      expressSession({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
      }),
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(`${__dirname}/build`));
    app.use('/public', express.static(path.join(rootDir, 'src/public')));

    app.use('/api/kakao/auth', authRouter);
    app.use('/api/events', eventsRouter);
    app.use('/api/user', authJwt as RequestHandler, userRouter);
    // app.use('/api/user', authRouter, userRouter);
    app.use('/api/upload', uploadRouter);
    app.use('/api/blog', blogRouter);
    app.use('/auth', loginRouter);

    if (nextJsEnabled)
      app.get('*', (req, res) => {
        return nextJsRequestHandler(req, res);
      });

    app.listen(process.env.PORT, () => {
      console.info(`http://localhost:${process.env.PORT}`);
    });
  } catch (ex: any) {
    console.error(ex.stack);
    process.exit(1);
  }
})();

import express, { RequestHandler } from 'express';
import Next from 'next';
import connect from './schemas';
import path from 'path';
import chatRouter from './routes/kakao/chat';
import imageRouter from './routes/kakao/image';
import tokenRouter from './routes/kakao/token';
import authRouter from './routes/kakao/auth';
import kakaoUserRouter from './routes/kakao/user';
import kakaoFriendRouter from './routes/kakao/friend';
import eventsRouter from './routes/events';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';
import blogRouter from './routes/blog';
import loginRouter from './routes/login';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import runSocketIo from './sockets';
import authKakaoJwt from './auth/kakao/authJwt';
import { authJwt } from './auth/authJwt';

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
    app.get('/kakaotalk/uploads/:fileName', (req, res) => {
      const { fileName } = req.params;
      res.sendFile(path.join(__dirname, `./kakaotalk/uploads/${fileName}`));
    });

    app.use('/api/kakao/image', imageRouter);
    app.use('/api/kakao/token', tokenRouter);
    app.use('/api/kakao/chat', authKakaoJwt, chatRouter);
    app.use('/api/kakao/auth', authRouter);
    app.use('/api/kakao/user', authKakaoJwt, kakaoUserRouter);
    app.use('/api/kakao/friend', authKakaoJwt, kakaoFriendRouter);
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

    const server = app.listen(process.env.PORT, () => {
      console.info(`http://localhost:${process.env.PORT}`);
    });

    runSocketIo(server);
  } catch (ex: any) {
    console.error(ex.stack);
    process.exit(1);
  }
})();

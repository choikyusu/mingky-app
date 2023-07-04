import express from 'express';
import Next from 'next';
import connectDB from './schemas';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import runSocketIo from './sockets';
import kakaoRoutes from './routes/kakao';
import routes from './routes';

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

    connectDB();

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

    app.use(routes);
    app.use(kakaoRoutes);

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

import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import routes from '../routes';
import kakaoRoutes from '../routes/kakao';
import connectDB from '../schemas';
import path from 'path';

const rootDir = path.resolve('./');

const createApp = () => {
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

  return app;
};

export default createApp;

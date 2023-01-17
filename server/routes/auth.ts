import express, { NextFunction } from 'express';

const router = express.Router();

// naver 로그인
router.get('*', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
});

export default router;

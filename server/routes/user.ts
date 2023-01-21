import express from 'express';
import { User } from '../schemas/user';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const user = await User.find({});
      res.json({ user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { id, name, email, gender, age } = req.body;

    try {
      const user = await User.create({
        id,
        name,
        email,
        gender,
        age,
      });
      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// router.route('/:user_id').get(async (req, res, next) => {
//   const { user_id: userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     res.json({ user });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.route('/me').get(async (req, res, next) => {
  try {
    console.log('test3', req.user);
    if (req.isAuthenticated()) {
      console.log('test');
      const { name, snsId, email, gender, birthYear, mobile } = req.user as any;
      res.json({
        user: {
          accountType: 'MEMBER',
          id: snsId,
          name,
          email,
          gender,
          birthYear,
          mobile,
        },
      });
    } else {
      console.log('test2');
      res.json({
        user: {
          accountType: 'ANONYMOUS',
        },
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;

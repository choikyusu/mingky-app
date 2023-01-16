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

router.route('/:user_id').get(async (req, res, next) => {
  const { user_id: userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json({ user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;

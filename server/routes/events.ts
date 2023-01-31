import express from 'express';
import { Event } from '../schemas/event';
import { Post } from '../schemas/post';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const events = await Event.find({});
      res.json({ events });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const {
      category,
      name,
      nameText,
      startDate,
      endDate,
      description,
      summary,
      status,
      done,
      bold,
      hide,
      check,
    } = req.body;

    try {
      const event = await Event.create({
        category,
        name,
        nameText,
        startDate,
        endDate,
        description,
        summary,
        status,
        done,
        bold,
        hide,
        check,
      });
      res.status(201).json({ event });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router
  .route('/:event_id')
  .get(async (req, res, next) => {
    const { event_id: eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      res.json({ event });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const { event_id: eventId } = req.params;
    const {
      category,
      name,
      nameText,
      startDate,
      endDate,
      description,
      summary,
      status,
      done,
      bold,
      hide,
      check,
    } = req.body;
    try {
      const event = await Event.updateOne(
        { id: eventId },
        {
          category,
          name,
          nameText,
          startDate,
          endDate,
          description,
          summary,
          status,
          done,
          bold,
          hide,
          check,
        },
      );
      res.json({ event });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.route('/temp/:post_id').get(async (req, res, next) => {
  const { post_id: postId } = req.params;
  try {
    const post = await Post.findById(postId);
    res.json({ post });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;

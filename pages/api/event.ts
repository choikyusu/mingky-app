import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { Event } from '../../models/event';
import createHandler from '../../lib/mongoose/createHandler';

const handler = createHandler();

handler.get(async (req, res) => {
  console.log('test');
  try {
    const events = await Event.find({});
    res.json({ events });
  } catch (err) {
    console.error(err);
  }
});

handler.post((req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;

/* eslint-disable camelcase */
import { ImageUploadError } from '@/server/Error/ImageUploadError';
import express from 'express';
import multer from 'multer';
import path from 'path';

const dest = path.join(__dirname, '../../kakaotalk/uploads/');
const upload = multer({ dest });
const router = express.Router();

router.post('/profile/upload', upload.single('image'), (req, res) => {
  try {
    const image = req.file as Express.Multer.File;
    return res.json({ data: `uploads\\${image.filename}` });
  } catch (err: any) {
    throw new ImageUploadError(err.message);
  }
});

export default router;

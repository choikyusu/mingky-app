/* eslint-disable camelcase */
import express from 'express';
import multer from 'multer';
import path from 'path';
import { ImageUploadError } from '../../Error/ImageUploadError';

const dest = path.join(__dirname, '../../kakaotalk/uploads/');
const upload = multer({ dest });
const router = express.Router();

router.post('/profile/upload', upload.single('image'), (req, res, next) => {
  try {
    const image = req.file as Express.Multer.File;
    return res.json({ data: `uploads\\${image.filename}` });
  } catch (err: any) {
    return next(new ImageUploadError(err.message));
  }
});

export default router;

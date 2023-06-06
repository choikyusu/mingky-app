/* eslint-disable camelcase */
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
    console.log('err', err);
    return res.status(400).json({ msg: err.message });
  }
});

export default router;

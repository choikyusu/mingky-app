import express, { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import { upload } from '../utils/multer';

require('dotenv').config();

const router = express.Router();

// 이미지를 업로드하는 라우트
router
  .route('/')
  .post(upload.single('photo'), (req: Request, res: Response) => {
    try {
      sharp(req.file?.path) // 압축할 이미지 경로
        .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
        .withMetadata() // 이미지의 exif데이터 유지
        .toBuffer((err, buffer) => {
          if (err) throw err;
          if (req.file)
            fs.writeFile(req.file?.path, buffer, err => {
              if (err) throw err;
            });
        });
    } catch (err) {
      console.log(err);
    }
    res.json({
      filename: `${process.env.SERVICE_URL}:${process.env.PORT}${process.env.IMAGE_URL}${req.file?.filename}`,
    });
  });

export default router;

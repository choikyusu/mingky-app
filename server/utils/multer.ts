import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

require('dotenv').config();

const rootDir = path.resolve('./');

fs.readdir(rootDir + process.env.IMAGE_LOCAL_PATH, err => {
  if (err) {
    fs.mkdirSync(rootDir + process.env.IMAGE_LOCAL_PATH, { recursive: true });
  }
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // 확장자 필터링
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true); // 해당 mimetype만 받겠다는 의미
  } else {
    // 다른 mimetype은 저장되지 않음
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    // 폴더위치 지정
    destination: (req, file, done) => {
      done(null, rootDir + process.env.IMAGE_LOCAL_PATH);
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
  }),
  fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

export { upload };

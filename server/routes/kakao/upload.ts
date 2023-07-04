import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:fileName', (req, res) => {
  const { fileName } = req.params;
  res.sendFile(path.join(__dirname, `./kakaotalk/uploads/${fileName}`));
});

export default router;

import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import fs from 'fs';
import path from 'path';
import { Post } from '../schemas/post';

const rootDir = path.resolve('./');

const router = express.Router();

const url =
  'https://blog.naver.com/PostView.naver?blogId=kyusu88&logNo=222925822915&redirect=Dlog&widgetTypeCall=true&directAccess=false';

router.route('/').post(async (req, res, next) => {
  const p = Promise.resolve();
  const { url } = req.body;
  const splitedUrl = url.split('/');

  const userId = splitedUrl.at(-2);
  const postId = splitedUrl.at(-1);

  const postUrl = `https://blog.naver.com/PostView.naver?blogId=${userId}&logNo=${postId}&redirect=Dlog&widgetTypeCall=true&directAccess=false`;

  try {
    const response = await axios({
      url: postUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const content = iconv.decode(response.data, 'UTF-8').toString();
    const $ = cheerio.load(content);
    const titleTextSelector = $('.se-title-text');
    const mainTextSelector = $('.se-main-container');
    const imageListSelector = $('.se-main-container img');
    const youtubeListSelector = $('.se-oembed script');
    const unusedElementSelector = $('.se-is-progress');
    const imageMap: { [key: string]: string } = {};

    const promiseImageDownload = imageListSelector.map(async (i, elem) => {
      const imgUrl = $(elem).attr('src');

      if (imgUrl) {
        if (imageMap[imgUrl]) {
          $(elem).attr(
            'src',
            `${process.env.SERVICE_URL}:${process.env.PORT}${process.env.IMAGE_URL}${imageMap[imgUrl]}`,
          );
        } else {
          const response = await axios({
            url: imgUrl.replace('?type=w80_blur', '?type=w773'),
            method: 'GET',
            responseType: 'stream',
          });

          imageMap[imgUrl] = `${i}_${new Date().getTime()}_.png`;
          response.data.pipe(
            fs.createWriteStream(
              `${rootDir}${process.env.IMAGE_LOCAL_PATH}${imageMap[imgUrl]}`,
            ),
          );

          $(elem).attr(
            'src',
            `${process.env.SERVICE_URL}:${process.env.PORT}${process.env.IMAGE_URL}${imageMap[imgUrl]}`,
          );
        }
      }
    });

    await Promise.all(promiseImageDownload);

    // youtube iframe으로 변환
    youtubeListSelector.each((i, elem) => {
      const dataModule = $(elem).attr('data-module');
      if (!dataModule) return;

      const moduleObj = JSON.parse(dataModule);
      $(elem).replaceWith(moduleObj.data.html);
    });

    unusedElementSelector.remove();

    const tempPost = await Post.create({
      title: titleTextSelector.html(),
      contents: mainTextSelector.html(),
    });

    res.send({
      result: 'success',
      tempId: tempPost.id,
    });

    // try에서 오류가 발생하면 catch로.
  } catch (error) {
    console.log(error);
    res.send({
      result: 'fail',
      message: '크롤링에 문제가 발생했습니다',
      error,
    });
  }
});

export default router;

import Next from 'next';
import runSocketIo from './sockets';
import { logger } from './logger/logger';
import createApp from './express/express';

require('dotenv').config();

const { NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

const nextJsEnabled = true;

const nextJs = Next({ dev });
const nextJsRequestHandler = nextJs.getRequestHandler();

(async () => {
  try {
    if (nextJsEnabled) await nextJs.prepare();

    const app = createApp();

    if (nextJsEnabled)
      app.get('*', (req, res) => {
        return nextJsRequestHandler(req, res);
      });

    const server = app.listen(process.env.PORT, () => {
      logger.info(`http://localhost:${process.env.PORT}`);
    });

    runSocketIo(server);
  } catch (ex: any) {
    console.error(ex.stack);
    process.exit(1);
  }
})();

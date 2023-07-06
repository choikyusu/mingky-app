import { NextFunction, RequestHandler, Request, Response } from 'express';
import { logger } from '../logger';

export const logRequest: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method, originalUrl, body, query, params, ip, headers } = req;
  const userAgent = req.get('user-agent');
  logger.info(
    `[${method}] ${originalUrl} - IP: ${ip}, User-Agent: ${userAgent}, Body: ${JSON.stringify(
      body,
    )}, Query: ${JSON.stringify(query)}, Params: ${JSON.stringify(
      params,
    )}, Access-Token : ${headers.authorization}, Refresh-Token : ${
      headers.refresh
    }`,
  );
  next();
};

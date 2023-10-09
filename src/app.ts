import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './adapters/route/userRouter.js';
import { contactRouter } from './adapters/route/contactRouter.js';
import { AppError } from './adapters/utils/AppError.js';
import { callRouter } from './adapters/route/callRouter.js';

export function createApp() {
  const app: Express = express();

  app.use(express.json());
  app.use(bodyParser.json());

  app.use('/users', userRouter);
  app.use('/contacts', contactRouter);
  app.use('/calls', callRouter);

  // Catch unhandled routes (MIDDLEWARE)
  app.all('*', function (req: Request, res: Response, next: NextFunction) {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Error handling middleware
  app.use(function (err: AppError, req: Request, res: Response, next: NextFunction) {
    if (!err.statusCode) err.statusCode = 500;

    res.status(err.statusCode).send({
      status: 'error',
      message: err.message,
    });
  });

  return app;
}

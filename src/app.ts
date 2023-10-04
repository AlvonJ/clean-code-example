import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './adapters/route/userRouter.js';

export function createApp() {
  const app: Express = express();

  app.use(express.json());
  app.use(bodyParser.json());

  app.use('/users', userRouter);

  // Error handling middleware
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  });

  return app;
}

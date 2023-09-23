import express from 'express';

import { userRouter } from './adapters/route/userRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({
    status: 'error',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

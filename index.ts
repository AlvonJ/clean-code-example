import * as express from 'express';

import { userRouter } from './adapters/route/userRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'express-async-errors';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();

// routers
import jobRouter from './routes/jobsRouter.js';

// error handlers
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFound.js';

// conditions for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middlewares
app.use(express.json());

// test routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// validation test route
app.post(
  '/api/v1/test',
  [
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isLength({ min: 10 })
      .withMessage('name must be atleast 10 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello ${name}` });
  }
);

// routes
app.use('/api/v1/jobs', jobRouter);

// Not found route middleware
app.use(notFoundHandler);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

try {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected to DB`));
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}

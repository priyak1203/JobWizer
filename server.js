import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// routers
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobsRouter.js';
import authRouter from './routes/authRouter.js';

// error handlers
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFound.js';

// user authentication
import { authenticateUser } from './middlewares/authentication.js';

// conditions for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middlewares
app.use(express.json());
app.use(cookieParser());

// test routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

// routes
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);

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

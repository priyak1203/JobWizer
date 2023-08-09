import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// routers
import jobRouter from './routes/jobsRouter.js';

// conditions for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
  console.log(user);
  res.send('Hello World');
});

app.post('/', (req, res) => {
  res.json({ message: 'message received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

// Not Found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'route does not exist' });
});

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ msg: 'something went wrong' });
});

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

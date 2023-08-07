import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'message received', data: req.body });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

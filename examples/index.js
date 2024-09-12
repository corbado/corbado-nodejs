import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRoutes from './session/index.js';
import identifierRoutes from './identifier/index.js';
import userRoutes from './user/index.js';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (_, res) => {
  res.send('Hello world!');
});

app.get('/session', sessionRoutes);
app.get('/user', userRoutes);
app.get('/identifier', identifierRoutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

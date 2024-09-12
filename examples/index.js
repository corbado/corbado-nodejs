import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRoutes from './session/index.js';
import identifierRoutes from './identifier/index.js';
import userRoutes from './user/index.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/session', sessionRoutes);
app.use('/user', userRoutes);
app.use('/identifier', identifierRoutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

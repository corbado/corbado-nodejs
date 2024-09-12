import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRouter from './session/index.js';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (_, res) => {
  res.send('Hello world!');
});

app.get('/session', sessionRouter);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

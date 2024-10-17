import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';
import { ValidationError } from '@corbado/node-sdk/errors';

const router = express.Router();
const config = new Config(
  process.env.CORBADO_PROJECT_ID,
  process.env.CORBADO_PROJECT_API_SECRET,
  process.env.CORBADO_FRONTEND_API,
  process.env.CORBADO_BACKEND_API,
);
const sdk = new SDK(config);

router.get('/', async (_, res) => {
  res.send('Hello world!');
});

router.get('/setCookie', async (req, res) => {
  // You'll have to supply your own session-token here.
  // Bear in mind that the session-token is only valid for 15 minutes.
  // If you change the cookie name via config.setSessionTokenCookieName, you'll
  // have to update the cookie name here asa well.
  const { sessionToken } = await req.query;

  res.cookie('cbo_session_token', sessionToken, { maxAge: 900000, httpOnly: true });
  res.send('Cookie set!');
});

router.get('/logged-in', async (req, res) => {
  try {
    const sessionToken = await req.cookies.cbo_session_token;
    const user = await sdk.sessions().validateToken(sessionToken);

    res.write(`User ID: ${user.userId}\n`);
    res.write(`User full name: ${user.fullName}\n`);
    res.end();
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(401).send('Unauthorized');
      return;
    }

    console.error(err);
    res.status(500).send(err.message);
  }
});

export default router;

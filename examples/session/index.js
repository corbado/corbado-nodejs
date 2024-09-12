import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';

const router = express.Router();

const config = new Config('pro-1', 'corbado1_hALCgZhe3oSwec8Hr2ZuF9w4DZAo9w', 'https://auth.corbado-dev.com');
config.setFrontendAPI('https://pro-1.frontendapi.corbado-dev.io');
config.setBackendAPI('http://localhost:15902/v2');
const sdk = new SDK(config);

router.get('/', async (_, res) => {
  res.send('Hello world!');
});

router.get('/setCookie', async (req, res) => {
  // You'll have to supply your own short session cookie value here.
  // Bear in mind that the short session cookie value is only valid for 15 minutes.
  // If you change the cookie name via config.setShortSessionCookieName, you'll
  // have to update the cookie name here asa well.
  const { shortSession } = await req.query;

  res.cookie('cbo_short_session', shortSession, { maxAge: 900000, httpOnly: true });
  res.send('Cookie set!');
});

router.get('/logged-in', async (req, res) => {
  try {
    const shortSession = await req.cookies.cbo_short_session;
    const user = await sdk.sessions().getAndValidateCurrentUser(shortSession);

    res.write(`User ID: ${user.userId}\n`);
    res.write(`User full name: ${user.fullName}\n`);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

export default router;

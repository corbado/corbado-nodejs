import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';

const router = express.Router();

const config = new Config('pro-1', 'corbado1_k8Ql8aUY5drWEUazwooZ6nfYyAyEm8', 'https://auth.corbado-dev.com');
config.setFrontendAPI('https://pro-1.frontendapi.corbado-dev.io');
config.setBackendAPI('https://api.corbado-dev.com');
const sdk = new SDK(config);

router.get('/', async (_, res) => {
  res.send('Hello world!');
});

router.get('/logged-in', async (req, res) => {
  try {
    const shortSession = await req.cookies.cbo_short_session;
    const user = await sdk.sessions().getCurrentUser(shortSession);
    console.log(sdk.sessions().getLastShortSessionValidationResult());

    res.write(`User ID: ${user.userID}\n`);
    res.write(`User full name: ${user.fullName}\n`);
    res.write(`User status: ${user.status}\n`);
    res.write(`User explicit Webauthn ID: ${user.explicitWebauthnID}\n`);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

export default router;

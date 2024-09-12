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

    if (user.authenticated) {
      // User is authenticated
      res.write('User is authenticated!\n');
      res.write(`User ID: ${user.id}\n`);
      res.write(`User full name: ${user.name}\n`);
      res.write(`User email: ${user.email}\n`);
      res.write(`User phone number: ${user.phoneNumber}\n`);

      const response = await sdk.users().get(user.id, null);
      res.write(`User created: ${response.data.created}\n`);
      res.write(`User updated: ${response.data.updated}\n`);
      res.write(`User status: ${response.data.status}\n`);
      res.end();
    } else {
      // User is not authenticated, redirect to login page
      res.redirect(302, '/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

export default router;

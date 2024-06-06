import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const config = new Config('pro-1', 'corbado1_k8Ql8aUY5drWEUazwooZ6nfYyAyEm8', 'https://auth.corbado-dev.com');
config.setFrontendAPI('https://pro-1.frontendapi.corbado-dev.io')
config.setBackendAPI('https://api.corbado-dev.com')
const sdk = new SDK(config);

app.get('/', async (req, res) => {
  res.send('Hello world!');
});

app.get('/setCookie', async (_req, res) => {
  // You'll have to supply your own short session cookie value here.
  // Bear in mind that the short session cookie value is only valid for 15 minutes.
  // If you change the cookie name via config.setShortSessionCookieName, you'll
  // have to update the cookie name here asa well.
  res.cookie(
    'cbo_short_session',
    'eyJhbGciOiJSUzI1NiIsImtpZCI6InBraS03ODEyOTMzNDM0MDMyMjA1MTU5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2F1dGguY29yYmFkby1kZXYuY29tIiwic3ViIjoidXNyLTEwIiwiZXhwIjoxNzE3Njk3NjQ4LCJuYmYiOjE3MTc2OTczMzgsImlhdCI6MTcxNzY5NzM0OCwianRpIjoiTlZ1WjVFcHlvZDNETVFWUHZZbUNsa3RpYmZUaXRhIiwibmFtZSI6Ik1hcnRpbiBLZWxsbmVyIiwib3JpZyI6Im1hcnRpbmtlbGxuZXI0NzBAZ21haWwuY29tIiwiZW1haWwiOiJtYXJ0aW5rZWxsbmVyNDcwQGdtYWlsLmNvbSIsInZlcnNpb24iOjJ9.lErrj5MgrnTSUTw66k2VtpIp_sdOavp-QWXtXmxALosNgZNAWXiGD3Bo_-QZY1i-tDL9bEgoMj9edAqQRQUVUohxY9GTwNqnG00UB8L8Oe0u2EfzdYvq6h7EJviS2GL1ihc7XkcGivSf2Lm3YC0EL8vt0NdyKjJKigaFcdY9gX3Q4_xM9pHE12R0LPsTJBmqd4bh9Udw9HGBVuXStRuvkdjEG68jRltANM-N2yaw0wgG-6_rm7X1Bn3D7d6WuxR2QxCV2rBmkdzlTOr65PHtCWCRfvmbY2XxTIUC9F89bWslb1ruEgC2nDHObqVBIA7uHaVd7VrraW--LeGFzGADkQ',
    { maxAge: 900000, httpOnly: true },
  );
  res.send('Cookie set!');
});

app.get('/logged-in', async (req, res) => {
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

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

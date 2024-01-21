import express, { Request, Response } from 'express';
import { Config, SDK } from '@corbado/node-sdk';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const config = new Config(process.env.CORBADO_PROJECT_ID as string, process.env.CORBADO_API_SECRET as string);
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
    'eyJhbGciOiJSUzI1NiIsImtpZCI6InBraS04OTc5Mjk2NzI3NDc1MTEzNjI1IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2F1dGguY29yYmFkby5jb20iLCJzdWIiOiJ1c3ItMTM1OTEwNjU3MDExNzcxMDAzNzgiLCJleHAiOjE3MDU2NTg3MDIsIm5iZiI6MTcwNTY1ODM5MiwiaWF0IjoxNzA1NjU4NDAyLCJqdGkiOiJZY3JMWlFrVkw3ZE5YdktZMnY0YjUyamlDZlVkWUIiLCJuYW1lIjoiU2FtIE9kdW0iLCJvcmlnIjoic2FtLm9kdW1AY29yYmFkby5jb20iLCJlbWFpbCI6InNhbS5vZHVtQGNvcmJhZG8uY29tIiwidmVyc2lvbiI6MX0.0V6dfc9RQg7jCrTibJkoATCFwdbhWBWE44fOAFthb7Ch8E4XVXb6TFSa6cGyIzn_KQxeotUaRIueJKINY-BB2aA-DnrPP7NAue2N76NdBsjoJLH3CyCbNNZ506UlLpTbgvM5KWdDQhHL2uN36qiH_tfHMVrvVALwecmMjMWPsKT7HwZmTL3WzDud6IZcWXVOi0LgyrbDV0pg5Q2g1XWcnQ_NZq0Pg9AYTrl89CLQFPvQbGVO8hPiasZfXcfghOiceD_U8Mg4DJ2nqX2DIUhCTgwfXWItfhwJLXFGE-3cuyHGpiBuRLmfsO9nps3kITNg9JCTSP3gztvSh02za4TTOg',
    { maxAge: 900000, httpOnly: true },
  );
  res.send('Cookie set!');
});

app.get('/logged-in', async (req: Request, res: Response) => {
  try {
    const shortSession = await req.cookies.cbo_short_session;
    const user = await sdk.sessions().getCurrentUser(shortSession);

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

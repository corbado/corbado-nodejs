import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));

//////////////////////////////////////////////////////////////////////////////////////////////
// Basic example which serves as basis for code snippets for integration guides             //
//////////////////////////////////////////////////////////////////////////////////////////////

import { Config, SDK } from '@corbado/node-sdk';
import { ValidationError } from '@corbado/node-sdk/errors';

//////////////////////////////////////////////////////////////////////////////////////////////
// Instantiate SDK                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////

// Configuration
const projectID = '<Your Project ID>';
const apiSecret = '<Your API secret>';
const frontendAPI = '<Frontend API URL>';
const backendAPI = '<Backend API URL>';

// Create SDK instance
const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

app.get('/', async (_, res) => {
  //////////////////////////////////////////////////////////////////////////////////////////////
  // Protecting routes                                                                        //
  //////////////////////////////////////////////////////////////////////////////////////////////

  // Retrieve the session-token from cookie (e.g. req.cookies.cbo_session_token)
  const sessionToken = '<Your session-token>';

  if (!sessionToken) {
    // If the session-token is empty (e.g. the cookie is not set or
    // expired), the user is not authenticated. e.g. redirect to login page.

    console.log('User not authenticated');
    res.redirect('/login');
  }

  let user;

  try {
    user = await sdk.sessions().validateToken(sessionToken);

    console.log(`User with ID ${user.userId} is authenticated!`);
  } catch (err) {
    if (err instanceof ValidationError) {
      // Handle the user not being authenticated, e.g. redirect to login page

      console.log(err.message, err.statusCode);
      res.redirect('/login');
      return;
    }

    console.error(err);
    res.status(500).send(err.message);
    return;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Getting user data from session-token                                                     //
  //////////////////////////////////////////////////////////////////////////////////////////////

  user = await sdk.sessions().validateToken(sessionToken);

  console.log('UserID', user.userId);
  console.log('Full Name', user.fullName);

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Getting user data from Corbado Backend API                                               //
  //////////////////////////////////////////////////////////////////////////////////////////////

  user = await sdk.sessions().validateToken(sessionToken);

  const fullUser = await sdk.users().get(user.userId);

  const fullName = fullUser.fullName;
  const userStatus = fullUser.status;

  console.log('User full name', fullName);
  console.log('User status', userStatus);

  // To get the email we use the IdentifierService
  const identifiersList = await sdk.identifiers().listByUserIdAndType(user.userId, 'email');

  console.log('Email', identifiersList.identifiers[0].value);

  res.status(200).send('Success');
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

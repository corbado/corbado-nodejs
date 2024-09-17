import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));

//////////////////////////////////////////////////////////////////////////////////////////////
// Basic example which serves as basis for code snippets for integration guides             //
//////////////////////////////////////////////////////////////////////////////////////////////

import { Config, SDK } from '@corbado/node-sdk';

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

  const shortTermSessionValue = '<Your short-term session value>';

  if (!shortTermSessionValue) {
    // If the short-term session value is empty (e.g. the cookie is not set or
    // expired), the user is not authenticated. e.g. redirect to login page.

    res.status(401).send('User not authenticated');
  }

  let user;

  try {
    user = await sdk.sessions().validateToken(shortTermSessionValue);

    console.log(`User with ID ${user.userID} is authenticated!`);
  } catch (err) {
    if (err instanceof Error) {
      // Handle the user not being authenticated, e.g. redirect to login page

      console.log(err.message);
      res.status(401).send(err.message);
      return;
    }

    console.error(err);
    res.status(500).send(err.message);
    return;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Getting user data from short-term session (represented as JWT)                           //
  //////////////////////////////////////////////////////////////////////////////////////////////

  user = await sdk.sessions().validateToken(shortTermSessionValue);

  console.log('UserID', user.userID);
  console.log('Full Name', user.fullName);

  //////////////////////////////////////////////////////////////////////////////////////////////
  // Getting user data from Corbado Backend API                                               //
  //////////////////////////////////////////////////////////////////////////////////////////////

  user = await sdk.sessions().validateToken(shortTermSessionValue);

  const fullUser = await sdk.users().get(user.userID);

  const fullName = fullUser.fullName;
  const userStatus = fullUser.status;

  console.log('User full name', fullName);
  console.log('User status', userStatus);

  // To get the email we use the IdentifierService
  const identifiersList = await sdk.identifiers().listByUserIdAndType(user.userID, 'email');

  console.log('Email', identifiersList.identifiers[0].value);
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

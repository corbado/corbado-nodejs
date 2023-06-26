# Corbado Node.js SDK

This SDK facilitates effortless integration of Corbado's Backend API within your Node.js applications.

## Documentation

For a detailed understanding of how to use the Corbado Backend API, refer to
the [Corbado Backend API Reference](https://api.corbado.com/docs/api/)
and [Corbado API-only integration guide](https://docs.corbado.com/integrations/api-only).

## Requirements

Ensure your environment runs Node 8 or higher.

## Installation

Use the following command to install the Corbado Node.js SDK:

```sh
npm install @corbado/node-sdk --save
```

## Usage

To initialize the SDK, supply it with your Corbado account's ```project ID``` and ```API secret```. You can obtain these
parameters
from the [Corbado developer panel](https://app.corbado.com).

## Initialization

### ES5:

```JavaScript
const Corbado = require('@corbado/node-sdk');

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;

const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);
```

### ES6:

```JavaScript 
import {SDK, Configuration} from '@corbado/node-sdk';

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Configuration(projectID, apiSecret);
const corbado = new SDK(config);
```

### Services

The Corbado SDK provides a range of services including:

- `AuthTokens`
- `EmailLinks`
- `Passkeys`
- `Session`
- `User`
- `Webhooks`


To use a specific service, such as Session, invoke it as shown below:

```
corbado.session.getCurrentUser(req);
```

Some selected services are explained in more detail below:

#### Corbado session management

Corbado offers an efficient and secure session management system (refer to
the [documentation](https://docs.corbado.com/overview/welcome) for more details).

To validate a user after authentication, call `getCurrentUser(req)` which returns a user object with
all information about the current user. This object contains the current authentication state as well as user's id,
name, email and phone number.

```JavaScript
const user = await corbado.session.getCurrentUser(req);
if (user.authenticated) {
    // Do anything with authenticated user
} else {
    // Perform login ceremony
}
```

#### Corbado webhooks

When using webhooks, it's best practice to provide the webhooks username and password in the config during instantiation:

##### ES5:

```JavaScript
const Corbado = require('@corbado/node-sdk');

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;

const config = new Corbado.Configuration(projectID, apiSecret);
config.webhookUsername = process.env.WEBHOOK_USERNAME;
config.webhookPassword = process.env.WEBHOOK_PASSWORD;
const corbado = new Corbado.SDK(config);
```

##### ES6:

```JavaScript 
import {SDK, Configuration} from '@corbado/node-sdk';

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Configuration(projectID, apiSecret);
config.webhookUsername = process.env.WEBHOOK_USERNAME;
config.webhookPassword = process.env.WEBHOOK_PASSWORD;
const corbado = new SDK(config);
```

You can protect routes with the webhooks middleware, e.g.:

```JavaScript
app.post('/api/corbado/webhook', corbado.webhooks.middleware, json(), handleWebhook);
```

A sample endpoint, handling the webhooks could look like:
```JavaScript
export const handleWebhook = async (req, res) => {
    try {
        // Get the webhook action and act accordingly. Every Corbado
        // webhook has an action.

        let request: any;
        let response: any;
        console.log("BEFORE ACTION");
        switch (corbado.webhooks.getAction(req)) {

            // Handle the "authMethods" action which basically checks
            // if a user exists on your side/in your database.
            case corbado.webhooks.WEBHOOK_ACTION.AUTH_METHODS: {
                console.log("WEBHOOK AUTH METHODS");
                request = corbado.webhooks.getAuthMethodsRequest(req);

                // Now check if the given user/username exists in your
                // database and send status. Implement getUserStatus()
                // function below.#
                console.log("BEFORE USER STATUS");

                const status = await getUserStatus(request.data.username);
                let correctUserStatus = status.userStatus;
                if(status.createdByCorbado) {
                    correctUserStatus = "not_exists"
                }
                response = corbado.webhooks.getAuthMethodsResponse(correctUserStatus);
                res.json(response);
                break;
            }

            // Handle the "passwordVerify" action which basically checks
            // if the given username and password are valid.
            case corbado.webhooks.WEBHOOK_ACTION.PASSWORD_VERIFY: {
                console.log("WEBHOOK PASSWORD VERIFY");
                request = corbado.webhooks.getPasswordVerifyRequest(req);

                // Now check if the given username and password is
                // valid. Implement verifyPassword() function below.
                const isValid = await verifyPassword(request.data.username, request.data.password)
                response = corbado.webhooks.getPasswordVerifyResponse(isValid);
                res.json(response);
                break;
            }
            default: {
                res.status(400).send('Bad Request');
                return;
            }
        }
    } catch (error: any) {

        // We expose the full error message here. Usually you would
        // not do this (security!) but in this case Corbado is the
        // only consumer of your webhook. The error message gets
        // logged at Corbado and helps you and us debugging your
        // webhook.
        console.log(error);

        // If something went wrong just return HTTP status
        // code 500. For successful requests Corbado always
        // expects HTTP status code 200. Everything else
        // will be treated as error.

        res.status(500).send(error.message);
        return;
    }
}
```

### Utility functions

The SDK also features utility functions to streamline the development process:

```JavaScript
corbado.utils.getClientInfo(req);
```

This function helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```) object from
an ```HttpRequest```.

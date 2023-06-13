# Corbado Node.js SDK

The Corbado Node.js SDK provides convenient access to the Corbado Backend API from applications running on Node.js.

## Documentation

See the [Corbado Backend API Reference](https://api.corbado.com/docs/api/)
and [Corbado API-only integration guide](https://docs.corbado.com/integrations/api-only) to understand the usage of
the Corbado Backend API.

## Requirements

Node 8 or higher.

## Installation

```sh
npm install @corbado/nodejs --save
```

## Usage

The package needs to be configured with your Corbado account's ```project ID```, ```API secret```
and `Authentication URL`. All the parameters
can be obtained from [Corbado developer panel](https://app.corbado.com).

```project ID``` and ```API secret``` should be provided when initializing the Corbado module:

```JavaScript
const Corbado = require('@corbado/nodejs');

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const authenticationURL = process.env.AUTHENTICATION_URL;

const config = new Corbado.Configuration(projectID, apiSecret);
config.authenticationURL = authenticationURL;
const corbado = new Corbado.SDK(config);

```

### Services

Corbado provides several services, e.g.:

- `Passkeys`
- `EmailLinks`
- `SessionV1`
- `SessionV2`
- `User`
- `Webhook`

To access specific methods in, e.g. `Sessionv2`, you can call:

```
corbado.sessionV2.validateShortSessionValue(req);
```

### Corbado session management

Corbado offers easy and secure session management (see the [docs](https://docs.corbado.com/overview/welcome) for
details)

To validate a user after authentication, call `validateshortSessionValue(req)` which returns a user object with
all information about the current user. This object contains the current authentication state as well as user's id,
name,
email and phone number.

```JavaScript
const user = await corbado.session.validateShortSessionValue(req);
if (user.authenticated === true) {
    // Do anything with authenticated user
} else {
    // Perform login ceremony
}
```

### Utilities

This SDK also provides several utility functions that can ease the development process, e.g.:

```JavaScript
Corbado.getClientInfo(req);
```

This function helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```) object from
an ```HttpRequest```.

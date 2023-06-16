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
npm install @corbado/nodejs --save
```

## Usage

To initialize the SDK, supply it with your Corbado account's ```project ID``` and ```API secret```. You can obtain these
parameters
from the [Corbado developer panel](https://app.corbado.com).

## Initialization

### ES5:

```JavaScript
const Corbado = require('@corbado/nodejs');

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;

const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);
```

### ES6:

```JavaScript 
import {SDK, Configuration} from '@corbado/nodejs';

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Configuration(projectID, apiSecret);
const corbado = new SDK(config);
```

### Services

The Corbado SDK provides a range of services including:

- `AuthToken`
- `EmailLinks`
- `Passkeys`
- `Session`
- `User`
- `Webhook`

To use a specific service, such as Session, invoke it as shown below:

```
corbado.session.getCurrentUser(req);
```

### Corbado session management

Corbado offers an efficient and secure session management system (refer to
the [documentation](https://docs.corbado.com/overview/welcome) for more details).

To validate a user after authentication, call `validateshortSessionValue(req)` which returns a user object with
all information about the current user. This object contains the current authentication state as well as user's id,
name, email and phone number.

```JavaScript
const user = await corbado.session.getCurrentUser(req);
if (user.isAuthenticated()) {
    // Do anything with authenticated user
} else {
    // Perform login ceremony
}
```

### Utility functions

The SDK also features utility functions to streamline the development process:

```JavaScript
corbado.utils.getClientInfo(req);
```

This function helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```) object from
an ```HttpRequest```.

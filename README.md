<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Corbado Node.js SDK

[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
![Latest Stable Version](https://img.shields.io/npm/v/@corbado/node-sdk)
[![Coverage Status](https://github.com/corbado/corbado-nodejs/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true)](https://nolleh.gitcorbado/corbado-nodejs/badges/coverage-jest%20coverage.svg?raw=true)
[![codecov](https://codecov.io/gh/corbado/corbado-nodejs/graph/badge.svg?token=FD4TEXN6TR)](https://codecov.io/gh/corbado/corbado-nodejs)
[![documentation](https://img.shields.io/badge/documentation-Corbado_Backend_API_Reference-blue.svg)](https://apireference.cloud.corbado.io/backendapi-v2/)
[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ)

The [Corbado](https://www.corbado.com) Node SDK provides convenient access to the [Corbado Backend API](https://apireference.cloud.corbado.io/backendapi-v2/) from applications written in Node.js.

[![integration-guides](https://github.com/user-attachments/assets/7859201b-a345-4b68-b336-6e2edcc6577b)](https://app.corbado.com/getting-started?search=typescript)

:warning: The Corbado Node.js SDK is commonly referred to as a private client, specifically designed for usage within closed backend applications. This particular SDK should exclusively be utilized in such environments, as it is crucial to ensure that the API secret remains strictly confidential and is never shared.

:rocket: [Getting started](#rocket-getting-started) | :hammer_and_wrench: [Installation](#installation) | :books: [Advanced](#books-advanced) | :speech_balloon: [Support & Feedback](#speech_balloon-support--feedback)

## :rocket: Getting started

### Requirements

- Node.js 8 or higher.

## Installation

Use the following command to install the Corbado Node.js SDK:

```bash
npm install @corbado/node-sdk
```

## Usage

To create a Node.js SDK instance you need to provide your `Project ID` and `API secret` which can be found at the [Developer Panel](https://app.corbado.com).

### ES5:

```JavaScript
const Corbado = require('@corbado/node-sdk');

const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;

const config = new Corbado.Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new Corbado.SDK(config);
```

### ES6:

```JavaScript
import {SDK, Config} from '@corbado/node-sdk';

const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;

const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);
```

### See in action

- Check [Next.js](https://github.com/corbado/passkeys-nextjs) example
- Check [Express](https://github.com/corbado/passkeys-vuejs-express) example
- Check [Hono](https://github.com/corbado/passkeys-react-hono) example
- Check integration tests [here](tests/integration)

### Services

The Corbado Node.js SDK provides the following services:

- `sessions` for managing sessions ([examples](tests/unit/session.test.ts))
- `identifiers` for managing identifiers ([examples](tests/integration/services/identifier.test.ts))
- `users` for managing users ([examples](tests/integration/services/user.test.ts))

To use a specific service, such as `sessions`, invoke it as shown below:

```JavaScript
corbado.sessions().validateToken(req);
```

## :books: Advanced

### Error handling

The Corbado Node.js SDK throws exceptions for all errors. The following errors are thrown:

- `BaseError` for failed assertions and configuration errors (client side)
- `ServerError` for server errors (server side)

If the Backend API returns a HTTP status code other than 200, the Corbado Node.js SDK throws a `ServerError`. The `ServerError`class provides convenient methods to access all important data:

```javascript
try {
    // Try to get non-existing user with ID 'usr-123456789'
    const user = sdk.users().get('usr-123456789');
} catch (error: ServerError) {
    // Show HTTP status code (404 in this case)
    console.log(error.getHttpStatusCode());

    // Show request ID (can be used in developer panel to look up the full request
    // and response, see https://app.corbado.com/app/logs/requests)
    console.log(error.getRequestID());

    // Show full request data
    console.log(error.getRequestData());

    // Show runtime of request in seconds (server side)
    console.log(error.getRuntime());

    // Show validation error messages (server side validation in case of HTTP
    // status code 400 (Bad Request))
    console.log(error.getValidationMessages());

    // Show full error data
    console.log(error.getError());
}
```

## :speech_balloon: Support & Feedback

### Report an issue

If you encounter any bugs or have suggestions, please [open an issue](https://github.com/corbado/corbado-nodejs/issues/new).

### Slack channel

Join our Slack channel to discuss questions or ideas with the Corbado team and other developers.

[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ)

### Email

You can also reach out to us via email at vincent.delitz@corbado.com.

### Vulnerability reporting

Please report suspected security vulnerabilities in private to security@corbado.com. Please do NOT create publicly viewable issues for suspected security vulnerabilities.

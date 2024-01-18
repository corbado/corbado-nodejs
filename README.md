<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Corbado Node.js SDK

[![License](https://poser.pugx.org/corbado/php-sdk/license.svg)](https://packagist.org/packages/corbado/php-sdk)
![Latest Stable Version](https://img.shields.io/npm/v/@corbado/node-sdk)
[![Coverage Status](https://github.com/corbado/corbado-nodejs/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true)](https://nolleh.gitcorbado/corbado-nodejs/badges/coverage-jest%20coverage.svg?raw=true)
[![codecov](https://codecov.io/gh/corbado/corbado-nodejs/graph/badge.svg?token=FD4TEXN6TR)](https://codecov.io/gh/corbado/corbado-nodejs)
[![documentation](https://img.shields.io/badge/documentation-Corbado_Backend_API_Reference-blue.svg)](https://api.corbado.com/docs/api/)
[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ)

The [Corbado](https://www.corbado.com) Node SDK provides convenient access to the [Corbado Backend API](https://api.corbado.com/docs/api/) from applications written in Node.js.

:warning: The Corbado Node.js SDK is commonly referred to as a private client, specifically designed for usage within closed backend applications. This particular SDK should exclusively be utilized in such environments, as it is crucial to ensure that the API secret remains strictly confidential and is never shared.

:rocket: [Getting started](#rocket-getting-started) | :hammer_and_wrench: [Services](#hammer_and_wrench-services) | :books: [Advanced](#books-advanced) | :speech_balloon: [Support & Feedback](#speech_balloon-support--feedback)

## :rocket: Getting started

### Requirements

- Nodejs 8 or higher.

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

const config = new Corbado.Config(projectID, apiSecret);
const sdk = new Corbado.SDK(config);
```

### ES6:

```JavaScript
import {SDK, Config} from '@corbado/node-sdk';

const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;

const config = new Config(projectID, apiSecret);
const sdk = new SDK(config);
```

### Examples

A list of examples can be found in the integration tests [here](tests/integration).

### Services

The Corbado Node.js SDK provides the following services:

- `authTokens` for managing authentication tokens needed for own session management ([examples](tests/integration/services/authToken.test.ts))
- `emailMagicLinks` for managing email magic links ([examples](tests/integration/services/emailLink.test.ts))
- `emailOTPs` for managing email OTPs ([examples](tests/integration/services/emailOtp.test.ts))
- `sessions` for managing sessions
- `smsOTPs` for managing SMS OTPs ([examples](tests/integration/services/smsOtp.test.ts))
- `users` for managing users ([examples](tests/integration/services/user.test.ts))
- `validations` for validating email addresses and phone numbers ([examples](tests/integration/services/validation.test.ts))

To use a specific service, such as `sessions`, invoke it as shown below:

```JavaScript
corbado.sessions.getCurrentUser(req);
```

## :books: Advanced

### Error handling

The Corbado PHP SDK throws errors for all errors. The following errors are thrown:

- `BaseErrors` for failed assertions and configuration errors (client side)
- `ServerErrors` for server errors (server side)

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

If you encounter any bugs or have suggestions, please [open an issue](https://github.com/corbado/corbado-php/issues/new).

### Slack channel

Join our Slack channel to discuss questions or ideas with the Corbado team and other developers.

[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ)

### Email

You can also reach out to us via email at vincent.delitz@corbado.com.

### Vulnerability reporting

Please report suspected security vulnerabilities in private to security@corbado.com. Please do NOT create publicly viewable issues for suspected security vulnerabilities.

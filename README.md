<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Corbado Node.js SDK

[![License](https://poser.pugx.org/corbado/php-sdk/license.svg)](https://packagist.org/packages/corbado/php-sdk)
[![Latest Stable Version]
[![Test Status]
[![documentation](https://img.shields.io/badge/documentation-Corbado_Backend_API_Reference-blue.svg)](https://api.corbado.com/docs/api/)
[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ)

The [Corbado](https://www.corbado.com) PHP SDK provides convenient access to the [Corbado Backend API](https://api.corbado.com/docs/api/) from applications written in the PHP language.

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

### Examples

A list of examples can be found in the integration tests [here](tests/integration).

### Services

The Corbado Node.js SDK provides the following services:

- `authTokens` for managing authentication tokens needed for own session management ([examples](tests/integration/AuthToken))
- `emailMagicLinks` for managing email magic links ([examples](tests/integration/EmailMagicLink))
- `emailOTPs` for managing email OTPs ([examples](tests/integration/EmailOTP))
- `sessions` for managing sessions
- `smsOTPs` for managing SMS OTPs ([examples](tests/integration/SmsOTP))
- `users` for managing users ([examples](tests/integration/User))
- `validations` for validating email addresses and phone numbers ([examples](tests/integration/Validation))

To use a specific service, such as `sessions`, invoke it as shown below:

```JavaScript
corbado.session.getCurrentUser(req);
```

## :books: Advanced

### Error handling

The Corbado PHP SDK throws exceptions for all errors. The following exceptions are thrown:

- `AssertException` for failed assertions (client side)
- `ConfigException` for configuration errors (client side)
- `ServerException` for server errors (server side)
- `StandardException` for everything else (client side)

If the Backend API returns a HTTP status code other than 200, the Corbado Node.js SDK throws a `ServerException`. The `ServerException`class provides convenient methods to access all important data:

///<<<<Show sample errors here**\*\***

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

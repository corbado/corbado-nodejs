# Corbado Node.js library 

The Corbado Node.js library provides convenient access to the Corbado API from applications running on Node.js.

## Documentation 

See the [Corbado API Reference](https://api.corbado.com/docs/api/) and [Corbado API-only integration guide](https://docs.corbado.com/integrations/api-only) to understand the usage of Corbado API. 

## Requirements 

Node 8 or higher. 

## Installation 

```npm install @corbado/nodejs --save```


## Usage 

The package needs to be configured with your Corbado account's ```project ID``` and ```API secret```. All the parameters can be obtained from [Corbado developer panel](https://app.corbado.com). 

```project ID``` and ```API secret``` should be provided when initializing the Corbado module:


```
const Corbado = require('@corbado/nodejs');

const config = new Corbado.Configuration()
config.projectID = process.env.PROJECT_ID
config.apiSecret = process.env.API_SECRET

const sdk = new Corbado.SDK(config)

```

### Services 

Corbado provides several services, e.g. ```PasskeyService```, ```SessionService```, ```EmailLinkService``` or ```ShortSessionService```.
To access specific methods in, e.g. ```SessionService```, you can call:

```
sdk.session.verify(sessionToken, clientInfo);
```

### ShortSession

Short session service provides you an easy way of accessing our session v2 variant. 
It provides a validate method that returns a user object with all information about the current users state.
This state contains the current authentication state as well as users id, name, email and phone number.

```
const Corbado = require('@corbado/nodejs');

const config = new Corbado.Configuration()
config.projectID = process.env.PROJECT_ID
config.apiSecret = process.env.API_SECRET
config.authenticationURL = "https://" + validConfig.projectID + '.auth.corbado.com'

const corbado = new Corbado.SDK(config)

const user = await corbado.shortSession.validate(req)
if (user.authenticated === true) {
    // Do anything with authenticated user
} else {
    // Perform login ceremony
}
```


### Utilities

Corbado package also provides several useful utility functions that can ease the development process, e.g.:
```
Corbado.getClientInfo(req);
```
helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```, etc.) object from an ```HttpRequest```.

# Corbado Node.js Library 

The Corbado Node library provides convenient access to the Corbado API from applications written in server-side JavaScript.

## Documentation 

See the [Corbado API References](https://api.corbado.com/docs/api/) and [Official Corbado API implementation examples and documentation](https://corbado.gitbook.io/api-docs/overview/welcome) to understand the usage of Corbado API. 

## Requirements 

Node 8, 10 or higher. 

Installation 

npm install https://github.com/corbado/node-sdk#node-corbado-services-implementation -- save (Will be changed to npm install corbado --save   after publishing the official package to npm)

## Usage 

The package needs to be configured with your Corbado account's API secret key, ProjectId and Origin Parameters. All the parameters can be obtained from [Corbado Developer Dashboard](https://app.corbado.com). 

Api Secret Key, Origin and ProjectID can be provided when initiating the Corbado Module: 

```
const Corbado = require('corbado-test');
const corbado = new Corbado('uu....DZ', {
    'projectID': 'pro-4242...523',
    'origin': 'https://core.corbado.com',
});

```

### Services 

Corbado package provides several services.
To access specific methods in, e.g Corbado Webauthn Service, you can use: 

```
corbado.webauthnService.registerStart(email, clientInfo);
```


### Utilities

Corbado package also provides several useful utitlity functions that can make the development process easier, e.g.:
```
corbado.utils.getClientInfo(req);
```
helps to obtain relevant client information (User Agent, Remote Address, etc.) object from an Http Request.
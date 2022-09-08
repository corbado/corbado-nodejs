# Corbado Node.js Library 

The Corbado Node library provides convenient access to the Corbado API from applications written in server-side JavaScript.

## Docuemntation 

See the Corbado API References https://api.corbado.com/docs/api/ and Official Corbado API implementation examples and documentation https://corbado.gitbook.io/api-docs/overview/welcome to understand the usage of Corbado API. 

## Requirements 

Node 8, 10 or higher. 

Installation 

npm install https://github.com/corbado/node-sdk#node-corbado-services-implementation -- save (Will be changed to npm install corbado --save   after publishing the official package to npm)

## Usage 

The package needs to be configured with your Corbado account's API secret key, ProjectId and Origin Parameters. All the parameters can be obtained from Corbado Developer Dashboard after signing up to https://app.corbado.com. 

Api Secret Key, Origin and ProjectId can be provided when initiating the Corbado Module: 

```
const Corbado = require("corbado-test");
const corbado = new Corbado("uu....DZ", {
    "projectId": "pro-4242...523",
    "origin": "google.com",
});

```

###Services 

Corbado package provides several services.
To access specific methods in, e.g Corbado Webauthn Service, you can use: 

```
corbado.webauthnService.registerStart(email, clientInfo);

```


# Corbado Node.js Library 

The Corbado Node.js library provides convenient access to the Corbado API from applications running on Node.js.

## Documentation 

See the [Corbado API Reference](https://api.corbado.com/docs/api/) and [Corbado API-only integration guide](https://docs.corbado.com/integrations/api-only) to understand the usage of Corbado API. 

## Requirements 

Node 8 or higher. 

## Installation 

```npm install corbado -- save``` (Will be changed to ```npm install corbado --save```.

Currently, the package is not yet published to the npm registry. To use it locally, follow these steps:

1. Navigate to the root directory of the npm package and run:
```
npm pack
```
2. In the project, where you want to use the package, run the following command to install the `.tgz` file, which was created in the previous step:
```
npm install /path/to/your/node-sdk.tgz
```
3. In your project, import the package with the following command:
```
const Corbado = require('node-sdk');
```

## Usage 

The package needs to be configured with your Corbado account's ```project ID``` and ```API secret```. All the parameters can be obtained from [Corbado developer panel](https://app.corbado.com). 

```Project ID``` and ```API secret``` should be provided when initializing the Corbado Module: 
=======
```npm install https://github.com/corbado/node-sdk#node-corbado-services-implementation -- save``` (Will be changed to ```npm install corbado --save```   after publishing the official package to NPM).

## Usage 

The package needs to be configured with your Corbado account's ```API Secret```, ```projectID``` and ```origin``` parameters. All the parameters can be obtained from [Corbado Developer Panel](https://app.corbado.com). 

```API Secret```, ```origin``` and ```projectID``` should be provided when initializing the Corbado Module:

```
const Corbado = require('corbado-test');
const corbado = new Corbado('pro-xxxx', 'uu....DZ');

```

### Services 

Corbado provides several services, e.g. ```CorbadoPasskeyService```,, ```CorbadoSessionService```, ```CorbadoEmailLinkService```.
To access specific methods in, e.g. ```CorbadoPasskeyService```, you can call:

```
corbado.passkeyService.registerStart(username, clientInfo, origin);
```

### Utilities

Corbado package also provides several useful utility functions that can ease the development process, e.g.:
```
corbado.utils.getClientInfo(req);
```
helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```, etc.) object from an ```HttpRequest```.

# Corbado Node.js library 

The Corbado Node.js library provides convenient access to the Corbado API from applications running on Node.js.

## Documentation 

See the [Corbado API Reference](https://api.corbado.com/docs/api/) and [Corbado API-only integration guide](https://docs.corbado.com/integrations/api-only) to understand the usage of Corbado API. 

## Requirements 

Node 8 or higher. 

## Installation 

```npm install corbado --save```


## Usage 

The package needs to be configured with your Corbado account's ```project ID``` and ```API secret```. All the parameters can be obtained from [Corbado developer panel](https://app.corbado.com). 

```project ID``` and ```API secret``` should be provided when initializing the Corbado module:


```
const Corbado = require('corbado-test');
const corbado = new Corbado('pro-xxxx', 'uu....DZ');

```

### Services 

Corbado provides several services, e.g. ```PasskeyService```, ```SessionService```, ```EmailLinkService```.
To access specific methods in, e.g. ```SessionService```, you can call:

```
corbado.sessionService.verify(sessionToken, clientInfo);
```

### Utilities

Corbado package also provides several useful utility functions that can ease the development process, e.g.:
```
corbado.utils.getClientInfo(req);
```
helps to obtain relevant client information (```UserAgent```, ```RemoteAddress```, etc.) object from an ```HttpRequest```.

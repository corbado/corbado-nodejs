const express = require('express');
const Corbado = require('@corbado/node-sdk');

const app = express();

const config = new Corbado.Config(process.env.CORBADO_PROJECT_ID, process.env.CORBADO_API_SECRET);
const sdk = new Corbado.SDK(config);

app.get('/validateAuthToken', async (req, res) => {
  try {
    const corbadoAuthToken = req.query.corbadoAuthToken;
    const request = {
      token: corbadoAuthToken,
      clientInfo: {
        remoteAddress: '127.0.0.1',
        userAgent: 'Corbado Node.js SDK Example'
      }
    }

    // Returns response on valid auth token, throws exception on invalid auth token
    const response = await sdk.authTokens().validate(request)

    res.send(response.data.userID);

  } catch (error) {
    res.send(error);
  }
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});

const express = require("express");

module.exports = function (corbado) {
  const router = express.Router();
  const passkeyService = corbado.passkeyService;

  router.post("/register-passkey-start", async (req, res) => {
    try {
      const { username, clientInfo, origin, requestID, credentialStatus } =
        req.body;

      const result = await passkeyService.registerStart(
        username,
        clientInfo,
        origin,
        requestID,
        credentialStatus
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/register-passkey-finish", async (req, res) => {
    try {
      const { publicKeyCredential, clientInfo, origin, requestID } = req.body;

      const result = await passkeyService.registerFinish(
        publicKeyCredential,
        clientInfo,
        origin,
        requestID
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/authenticate-passkey-start", async (req, res) => {
    try {
      const { username, clientInfo, origin, requestID } = req.body;

      const result = await passkeyService.authenticateStart(
        username,
        clientInfo,
        origin,
        requestID
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post("/authenticate-passkey-finish", async (req, res) => {
    try {
      const { publicKeyCredential, clientInfo, origin, requestID } = req.body;

      const result = await passkeyService.authenticateFinish(
        publicKeyCredential,
        clientInfo,
        origin,
        requestID
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};

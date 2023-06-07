const express = require("express");

module.exports = (corbado) => {
  const router = express.Router();
  const emailLinkService = corbado.emailLinkService;

  router.post("/send", async (req, res) => {
    try {
      const {
        email,
        redirect,
        create,
        additionalPayload,
        clientInfo,
        passkeySignUp,
        requestID,
      } = req.body;

      const response = await emailLinkService.send(
        email,
        redirect,
        create,
        additionalPayload,
        clientInfo,
        passkeySignUp,
        requestID
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/validate/:emailLinkID", async (req, res) => {
    try {
      const { emailLinkID } = req.params;
      const { token, requestID } = req.body;

      const response = await emailLinkService.validate(
        emailLinkID,
        token,
        requestID
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};

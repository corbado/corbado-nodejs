const express = require("express");

module.exports = function (corbado) {
  const router = express.Router();
  const sessionService = corbado.sessionService;

  router.post("/verify", async (req, res) => {
    try {
      const { sessionToken, clientInfo, requestID } = req.body;

      const response = await sessionService.verify(
        sessionToken,
        clientInfo,
        requestID
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};

const express = require("express");

module.exports = (corbado) => {
  const router = express.Router();
  const webhook = corbado.webhookService;

  // Constants to represent user status
  const EXISTS = "exists";
  const NOT_EXISTS = "not_exists";
  const BLOCKED = "blocked";

  // Set up webhook endpoint with Express and authenticate using the webhook username and password
  // configured in the Corbado developer panel.
  router.post(
    "/webhooks",
    corbado.webhookMiddleware("webhookUsername", "webhookPassword"),
    (req, res) => {
      try {
        // Get the webhook action and act accordingly. Every Corbado
        // webhook has an action.
        let request;
        let response;
        switch (webhook.getAction(req)) {
          // Handle the "authMethods" action which basically checks
          // if a user exists on your side/in your database.
          case webhook.WEBHOOK_ACTION.AUTH_METHODS: {
            request = webhook.getAuthMethodsRequest(req);

            // Now check if the given user/username exists in your
            // database and send status. Implement getUserStatus()
            // function below.
            const status = getUserStatus(request.data.username);
            response = webhook.getAuthMethodsResponse(status);
            res.json(response);
            break;
          }

          // Handle the "passwordVerify" action which basically checks
          // if the given username and password are valid.
          case webhook.WEBHOOK_ACTION.PASSWORD_VERIFY: {
            request = webhook.getPasswordVerifyRequest(req);

            // Now check if the given username and password is
            // valid. Implement verifyPassword() function below.
            const isValid = verifyPassword(
              request.data.username,
              request.data.password
            );
            response = webhook.getPasswordVerifyResponse(isValid);
            res.json(response);
            break;
          }
          default: {
            return res.status(400).send("Bad Request");
          }
        }
      } catch (error) {
        // We expose the full error message here. Usually you would
        // not do this (security!) but in this case Corbado is the
        // only consumer of your webhook. The error message gets
        // logged at Corbado and helps you and us debugging your
        // webhook.
        console.log(error);

        // If something went wrong just return HTTP status
        // code 500. For successful requests Corbado always
        // expects HTTP status code 200. Everything else
        // will be treated as error.
        return res.status(500).send(error.message);
      }
    }
  );

  /**
   * Verify given username and password.
   *
   * !!! MUST BE IMPLEMENTED BY YOU !!!
   *
   * @param {string} username
   * @param {string} password
   * @return {boolean}
   */
  function verifyPassword(username, password) {
    /////////////////////////////////////
    // Implement your logic here!
    ////////////////////////////////////

    return false;
  }

  /**
   * Checks if user exists on your side/in your database.
   *
   * !!! MUST BE IMPLEMENTED BY YOU !!!
   *
   * @param {string} username
   * @return {string}
   */
  function getUserStatus(username) {
    /////////////////////////////////////
    // Implement your logic here!
    ////////////////////////////////////

    // Example
    if (username === "existing@existing.com") {
      return EXISTS;
    }

    return NOT_EXISTS;
  }

  return router;
};

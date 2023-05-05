const express = require("express");
// Replace this with corbado npm package ´´´require('corbado')´´´
const Corbado = require("../src/corbado");
require("dotenv").config();
// Import routes
const webhookRoutes = require("./routes/webhookRoutes");
const passkeyRoutes = require("./routes/passkeyRoutes");
const emailLinkRoutes = require("./routes/emailLinkRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const corbado = new Corbado(process.env.PROJECT_ID, process.env.API_SECRET);

const app = express();
app.use(express.json());

// Use routes
app.use("/webhook", webhookRoutes(corbado));
app.use("/passkey", passkeyRoutes(corbado));
app.use("/email-link", emailLinkRoutes(corbado));
app.use("/session", sessionRoutes(corbado));

function startServer() {
  const port = process.env.PORT || 8000;
  app
    .listen(port, () => {
      console.log(`Server listening on port ${port}`);
    })
    .on("error", (error) => {
      console.error("Error starting server: ", error);
    });
}

try {
  startServer();
} catch (err) {
  console.error("Error starting server: ", err);
}

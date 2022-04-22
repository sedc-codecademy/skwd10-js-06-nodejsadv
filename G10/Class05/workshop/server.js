const express = require("express");

const app = express();
app.use(express.json());

const router = require("./router.const");
const session = require("./session.const");

app.use(session);
app.use(router);

app.listen(3000, () => {
  console.info("Server is up, and running...");
});

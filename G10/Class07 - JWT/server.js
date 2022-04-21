const express = require("express");
const cors = require("cors");

const router = require("./router.const");

const app = express();
app.use(express.json());
app.use(cors());
//localhost:3000/api/here_we_will_have_other_urls
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is up and running");
});

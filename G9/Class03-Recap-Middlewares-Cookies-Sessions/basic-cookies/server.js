const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

//1. Creating cookies from the backend
app.post("/create-cookie", (req, res) => {
  //Classic way of doing it (with header)
  res.set("Set-Cookie", "header-cookie=header-value");
  //Express way of creating cookies
  res.cookie("req-cookie", "random-value", {
    httpOnly: true,
    maxAge: 5 * 60 * 60 * 1000,
    secure: false,
  });

  res.cookie("another-cookie", "another-value", {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
    secure: false,
  });
  res.send("cookies created");
});

app.get("/read-cookie", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});

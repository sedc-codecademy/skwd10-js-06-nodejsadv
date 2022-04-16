const express = require("express");
const cors = require("cors");
const app = express();

// app.use(cors()) Allow cors on our server =)

// We can provide cors options
// app.use(
//   cors({
//     // origin: "*", => Everybody can make req to our server =) * means ALL

//     // Only requests from url http://127.0.0.1:5500/ can access our server
//     origin: "http://127.0.0.1:5500",
//     methods: ["POST", "GET", "PUT"],
//   })
// );

const whiteListenUrls = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5501",
  "http://127.0.0.1:5502",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (whiteListenUrls.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

app.use(cors(corsOptions));
app.get("/users", (req, res) => {
  const users = [
    { username: "bob", password: "bobski" },
    { username: "john", password: "doe" },
  ];

  res.send(users);
});

app.put("/users", (req, res) => {
  const users = [
    { username: "bob", password: "bobski" },
    { username: "john", password: "doe" },
  ];

  res.send(users);
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});

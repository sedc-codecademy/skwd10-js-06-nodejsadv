const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const dummyData = [
  {
    name: "shoes",
    price: 300,
  },
  {
    name: "tv",
    price: 1000,
  },
  {
    name: "dishwasher",
    price: 400,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(dummyData);
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});

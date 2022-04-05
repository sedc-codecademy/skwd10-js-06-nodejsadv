const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const DataService = require("./service/data.service");
const path = require("path");
const { fstat } = require("fs");

const dataPath = path.join(__dirname, "data", "data.json");

app.use(express.json());

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0"; //Same as localhost

//1. Get all items
app.get("/all", async (req, res) => {
  try {
    const data = await DataService.readFile(dataPath);
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
  } catch (error) {
    res.status(400).json(error);
  }
});
//2. Add new item
app.post("/add", async (req, res) => {
  try {
    const newItemData = req.body;
    const data = await DataService.readFile(dataPath);
    const parsedData = JSON.parse(data);

    const newItem = {
      id: uuid(),
      ...newItemData,
    };

    const updatedData = [...parsedData, newItem];

    await DataService.saveFile(dataPath, updatedData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error);
  }
});
//3. Get item by ID
//4. Update item
//5. Delete item

app.listen(PORT, HOST, () => {
  console.log(`Server is running at port: ${PORT}`);
});

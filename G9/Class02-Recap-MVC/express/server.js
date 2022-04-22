const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const DataService = require("./service/data.service");
const path = require("path");

const dataPath = path.join(__dirname, "data", "data.json");

app.use(express.json());

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0"; //Same as localhost

//1. Get all items
app.get("/all", async (req, res) => {
  try {
    const data = await DataService.readJSONFile(dataPath);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
//2. Add new item
app.post("/add", async (req, res) => {
  try {
    const newItemData = req.body;
    const data = await DataService.readJSONFile(dataPath);

    const newItem = {
      id: uuid(),
      ...newItemData,
    };

    const updatedData = [...data, newItem];

    await DataService.saveJSONFile(dataPath, updatedData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error);
  }
});
//3. Get item by ID
app.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const items = await DataService.readJSONFile(dataPath);

    const foundItem = items.find(item => item.id === itemId);
    if (foundItem) {
      res.status(200).json(foundItem);
    } else {
      res.status(404).json({ msg: "Item not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
//4. Update item
app.patch("/:id/update", async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemUpdates = req.body;

    if (itemUpdates.id) res.sendStatus(400);

    const items = await DataService.readJSONFile(dataPath);

    const foundItem = items.find(item => item.id === itemId);
    if (!foundItem) return res.status(404).json({ msg: "Item not found" });

    const updatedItem = { ...foundItem, ...itemUpdates };

    const updatedItems = items.map(item =>
      item.id === itemId ? updatedItem : item
    );

    await DataService.saveJSONFile(dataPath, updatedItems);

    res.status(200).send(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
//5. Delete item
app.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const items = await DataService.readJSONFile(dataPath);

    const updatedItems = items.filter(item => item.id !== itemId);

    if (items.length === updatedItems.length) res.sendStatus(400);

    await DataService.saveJSONFile(dataPath, updatedItems);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at port: ${PORT}`);
});

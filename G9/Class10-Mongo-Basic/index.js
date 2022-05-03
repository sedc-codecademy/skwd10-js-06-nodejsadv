require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb, connectToDatabase } = require("./db/mongo-connection");

const app = express();
app.use(express.json());

//*Simple connection to mongodb
// const { MongoClient, ObjectId } = require("mongodb");

// const client = new MongoClient(MONGO_URI);

// async function run() {
//   try {
//     await client.connect();

//     console.log("connected to mongodb");

//getting the databse
//     const database = client.db();
//getting the collection
//     const products = database.collection("products");
//query the database for all the products
//     const product = await products.findOne({
//       _id: new ObjectId("627151fe2b31f4c0656fbf8c"),
//     });
//getting the data out of the pointer
// const data = await dbPointer.toArray();

//     console.log(product);
//   } catch (error) {
//     console.log(error);
//   }
// }

// run();

//*CRUD Operations using mongodb
//1. Get all resources
app.get("/", async (req, res) => {
  try {
    const database = getDb();
    const products = database.collection("products");

    const dbPointer = await products.find({});

    const data = await dbPointer.toArray();

    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//2. Get resource by id
app.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const database = getDb();
    const products = database.collection("products");

    const product = await products.findOne({ _id: new ObjectId(productId) });

    if (!product) return res.status(404).send({ msg: "Not Found" });

    console.log(product);

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//3. Creating a resource
app.post("/", async (req, res) => {
  try {
    const productData = req.body;

    const database = getDb();
    const products = database.collection("products");

    const response = await products.insertOne(productData);

    console.log(response);

    res.status(201).send({
      msg: `Product with ${response.insertedId} was added successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//4. Updating a resource using PUT
app.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    const database = getDb();
    const products = database.collection("products");

    // const response = await products.replaceOne(
    //   { _id: new ObjectId(productId) },
    //   updatedProduct
    // );

    const response = await products.findOneAndReplace(
      { _id: new ObjectId(productId) },
      updatedProduct,
      {
        returnDocument: "after",
      }
    );

    console.log(response.value);

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//5. Updating a resource using PATCH
app.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const database = getDb();
    const products = database.collection("products");

    const response = await products.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: updates,
      }
    );

    if (response.modifiedCount === 0 || response.matchedCount === 0)
      return res.status(400).send({ msg: "Update failed" });

    // const response = await products.findOneAndUpdate(
    //   { _id: new ObjectId(productId) },
    //   {
    //     $set: updates,
    //   }
    // );

    console.log(response);
    res.status(200).send(response);
    // res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//6. Deleting a resource
app.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const database = getDb();
    const products = database.collection("products");

    const response = await products.deleteOne({ _id: new ObjectId(productId) });

    if (response.deletedCount === 0)
      return res.status(404).send({ msg: "Product not found" });

    console.log(response);

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.listen(3000, () => {
  connectToDatabase();
  console.log("Server is listening at port 3000");
});

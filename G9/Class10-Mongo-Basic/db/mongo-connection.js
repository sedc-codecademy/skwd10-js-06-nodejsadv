const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.zzhet.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const { MongoClient } = require("mongodb");

const client = new MongoClient(MONGO_URI);

let dbConnection;

module.exports = {
  connectToDatabase() {
    client.connect((error, mongoClient) => {
      if (error || !mongoClient) {
        return console.log(error);
      }

      dbConnection = mongoClient.db();

      console.log("Connected to MongoDB");
    });
  },

  getDb() {
    return dbConnection;
  },
};

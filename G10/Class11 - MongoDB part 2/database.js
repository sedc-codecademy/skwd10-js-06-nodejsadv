const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.tssnd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    );
    _db = client.db();
    callback();
  } catch (error) {
    console.log(error);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

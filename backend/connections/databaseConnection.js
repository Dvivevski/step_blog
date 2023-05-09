const mongoose = require("mongoose");
const config = require("../config/config");

const connectionString = config.server.db;

const databaseConnection = async () => {
  await mongoose.set("strictQuery", true);
  await mongoose
    .connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((resp) => console.log("Connected to MongoDB successfully"))
    .catch((error) => {
      console.log("Not Connected to MongoDB");
      console.log(error?.message || error);
    });
};

module.exports = databaseConnection;

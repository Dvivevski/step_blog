// Workaround dotenv dev dependency usage in production code
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const secretKey =
  "520ca46d0ebde52a8132caafdf58d7b4848ffdddf4c42d6118f994baaad573e603c3321b189de04a7648edfff43502ba79d5f6d2af";
const saltRounds = 10;
const PORT = 8080;
const DB = "mongodb://127.0.0.1:27017/blogs-db";

const config = {
  server: {
    port: PORT,
    db: DB,
    saltRound: saltRounds,
    accessTokenSecret: secretKey,
  },
};

module.exports = config;

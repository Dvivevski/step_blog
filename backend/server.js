const http = require("http");
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const databaseConnection = require("./connections/databaseConnection");
const errorHandler = require("./handlers/errorHandler");
const morgan = require("morgan");
const UserRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const cors = require("cors");
const BlogRoutes = require("./routes/blogs");

const port = 4000;

const app = express();

app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("welcome");
});

app.use("/api", UserRoutes);
app.use("/api", BlogRoutes);

// error handler for unknown request
app.use((req, res, next) => {
  throw new Error("Not found");
});

// error handler to catch any time of thrown error
app.use(errorHandler);

// Start server
(async () => {
  await databaseConnection();

  const server = http.createServer(app);
  server.keepAliveTimeout = 61000;
  server.headersTimeout = 65000;

  server.listen(port, () =>
    console.log(`Server is Listening at port: ${port}`)
  );
})();

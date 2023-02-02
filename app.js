const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();

app.use("/", (req, res, next) => next(), express.static("public"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  max: 50, // 10 is default
  idleTimeoutMillis: 10000, // 10000 is default
  connectionTimeoutMillis: 2000, // 0 (no timeout!) is default
});

// pool.on("error", (err) => {
//   console.error("pg pool error: ", err);
//   process.exit();
// });

app.use(async (req, res, next) => {
  try {
    req.client = await pool.connect();
    next();
  } catch (err) {
    console.error(err);
    console.error("*** totalCount", pool.totalCount);
    console.error("*** idleCount", pool.idleCount);
    console.error("*** waitingCount", pool.waitingCount);
    console.error("*** so, restarting server...");
    process.exit();
  }
});

const index = require("./routes/index");
const portfolios = require("./routes/portfolios");
app.use("/", index);
app.use("/portfolios", portfolios);

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);
server.on("listening", () => {
  console.log("Listening on ", server.address());
});

app.use((err, req, res, next) => {
  // console.log("error! " + err);
  return res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
require('dotenv').config();
require('../config/database');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public/uploads", express.static("public/uploads"));
app.use(cors());

// routing
require("./routes")(app);

// to handle all request which are not in routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handling (middleware as per express docs)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
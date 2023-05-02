const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./router/token-router");

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

// connect to database
const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server up and running at port ${port}`));

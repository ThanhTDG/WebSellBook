const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const router = require("./router");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/", router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Starting on port ${port}...`));
});

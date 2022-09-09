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

app.use(
  morgan(":date - :method: :url :status  :res[content-length] - :response-time ms")
);

app.use("/", router);

const mongoString = process.env.MONGO_URI;
mongoose
  .connect(mongoString)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Starting on port ${port}...`));
  })
  .catch((err) => console.log(err));

const conn = mongoose.connection;

conn.on("error", (error) => console.log(error));
conn.once("connected", () => console.log("Database connected"));

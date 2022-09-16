const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const router = require("./router");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  morgan(
    ":date - :method: :url :status  :res[content-length] - :response-time ms"
  )
);

app.use("/", router);

const mongoString = process.env.MONGO_URI;
mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Starting on port ${port}...`));
  })
  .catch((err) => console.log(err));

const conn = mongoose.connection;

conn.once("connected", () => console.log("Successfully connect to MongoDB"));
conn.on("error", (error) => console.log(error));

const cors = require("cors");
const express = require("express");
// const session = require("cookie-session");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const router = require("./router");

require("dotenv").config();

// Database connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connect to MongoDB"))
  .catch((err) => console.log(err));

// App
const app = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: { secure: true, maxAge: 60 * 60 * 1000 },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./configs/passport.config");

app.use(
  morgan(
    ":date - :method: :url :status  :res[content-length] - :response-time ms"
  )
);

// Routes
app.get("/", (req, res) => res.send("Welcome to ToiMuaSach API"));
app.use("/api", router);

// API documents
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
// if (process.env.NODE_ENV === "production") {
//   // TODO
//   app.use();
//   app.get("*", (req, res) => {
//     // TODO
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Starting server at http://localhost:${PORT}`)
);

module.exports = app;

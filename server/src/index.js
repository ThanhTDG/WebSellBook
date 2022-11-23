const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const {
  NODE_ENV: { PROC },
} = require("./constants");

const router = require("./router");

require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;

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
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      signed: true,
      httpOnly: true,
      secure: NODE_ENV === PROC,
      maxAge: 60 * 60 * 1000,
      sameSite: NODE_ENV === PROC ? "none" : "lax",
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./configs/passport.config");

app.use(
  morgan(
    ":date - :method: :url :status  :res[content-length] byte - :response-time ms"
  )
);

// Routes
app.get("/", (req, res) => res.send("Welcome to ToiMuaSach API"));
app.use("/api/v1", router);

// API documents
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// console.log(`NODE_ENV = ${NODE_ENV}`);
// if (NODE_ENV === PROC) {
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

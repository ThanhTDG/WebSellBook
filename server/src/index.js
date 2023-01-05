const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { configCloudinary } = require("./configs/cloudinary.config");
const { connectDatabase } = require("./configs/mongoose.config");
const { configPassport } = require("./configs/passport.config");

const {
  NODE_ENV: { PROC },
} = require("./constants");

const router = require("./router");

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

// Database connection
connectDatabase();

// Configures
configCloudinary();
configPassport();

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

app.use(
  morgan(
    ":date - :method: :url :status  :res[content-length] bytes - :response-time ms"
  )
);

// Routes
app.get("/", (req, res) => res.send("Welcome to ToiMuaSach API"));
app.use("/api/v1", router);

// API documents
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Starting server at http://localhost:${PORT}`)
);

module.exports = app;

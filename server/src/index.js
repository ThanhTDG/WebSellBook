const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = require("./router");

const docs = require("./docs");

dotenv.config();

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
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(
  morgan(
    ":date - :method: :url :status  :res[content-length] - :response-time ms"
  )
);

// Routes
app.use("/api", router);

// const swaggerDocs = swaggerJsDoc(docs);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));

console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "production") {
  // TODO
  // app.use();
  app.get("*", (req, res) => {
    // TODO
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Starting server at http://localhost:${PORT}`)
);

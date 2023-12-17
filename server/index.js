const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./src/routes/Routes");
const apiRoute = require("./src/routes/apiRoutes");

const errorHandler = (err, req, res, next) => {
  res.status(500).send("Internal Server Error");
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use("/auth", Routes);
app.use("/api", apiRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log("Server Running..."));

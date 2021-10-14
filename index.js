const express = require("express");
const routes = require("./route");
const app = express();
const cors = require("cors");
app.use(cors());
var bodyParser = require("body-parser");
var port = process.env.port || 3333;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET,OPTIONS"
    );
    return res.status(200).send({});
  }
  next();
});
app.use(routes);
app.listen(port);
console.log("Iniciando servidor na porta " + port);

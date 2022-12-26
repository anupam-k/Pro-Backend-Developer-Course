const express = require("express"); // import express
const app = express(); // create an app with express

// swagger docs related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 4000 || process.env.PORT; // what PORT number you are using
const format = require("date-format");

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/api/v1/instagram", (req, res) => {
  const instaSocial = {
    username: "_anupam_kumar_krishan",
    followers: 248,
    follows: 348,
    date: format.asString("dd-MM-yy - hh:mm:ss", new Date()),
  };

  res.status(200).json(instaSocial);
});

app.get("/api/v1/facebook", (req, res) => {
  const fbSocial = {
    username: "anupamkkrishnan",
    followers: 56,
    follows: 48,
    date: format.asString("dd-MM-yy - hh:mm:ss", new Date()),
  };

  res.status(200).json(fbSocial);
});

app.get("/api/v1/linkedin", (req, res) => {
  const linkedinSocial = {
    username: "_anupamkkrishnan_",
    followers: 1329,
    follows: 688,
    date: format.asString("dd-MM-yyyy - hh:mm:ss", new Date()),
  };

  res.status(200).json(linkedinSocial);
});

app.get("/api/v1/:token", (req, res) => {
  console.log(req.params.token);
  res.status(200).json({ param: req.params.token });
});

app.listen(PORT, (req, res) => {
  console.log(`App is running on PORT http//:localhost:${PORT}`);
});

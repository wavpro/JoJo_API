const express = require('express');
const route = require("./router.js");
const rateLimit = require("express-rate-limit");
const lib = require("./lib/index.js");

const app = express();

app.get('*', (req, res) => {
  route(req, res)
});

app.use("/api/", rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
}));

app.listen(3000, () => {
  console.log('server started');
});

lib.scraper.characters();
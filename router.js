const fs = require("fs");

function route(req, res) {
  let path = req.path;
  if (path.endsWith("/")) path = path.replace(/\/$/, "/index");
  fs.readFile(`./pages/.${path}.js`, (err, data) => {
    if (err) {
      require("./pages/404.js")(req, res)
    } else {
      require(`./pages/.${path}.js`)(req, res)
    }
  })
}

module.exports = route;
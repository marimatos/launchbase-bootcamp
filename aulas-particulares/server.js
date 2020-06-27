const express = require ("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.urlencoded({ extended:true })) // responsável por funcionar o req.body
server.use(routes);
server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", { express: server })


server.listen(5000, function() {
  console.log("server is running")
})
const express = require("express");
const nunjucks = require("nunjucks");
const courses = require("./data");

const server = express();

//o server vai observar a pasta public para trazer os arquivos estáticos
server.use(express.static('public'));

server.set("view engine", "njk");
nunjucks.configure("views", { express: server });


server.get("/", function(req, res){
  return res.render("index");
})

server.get("/courses", function(req, res){
  return res.render("courses", {items: courses });
})

server.get("/courses/:id", function(req, res) {
  const id = req.params.id;

  const course = courses.find(function(course) {
    return course.id == id
  })

  if(!course) {
    return res.send("Course Not Found")
  }

  return res.render("description", { course });
});

server.listen(5000, function(){
  console.log("server is running")
})
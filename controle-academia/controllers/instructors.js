const fs = require('fs');
const data = require('../data.json');
const { age, date } = require("../utils");
const Intl = require('intl');

exports.index = function(req, res){
  return res.render('instructors/index', { instructors: data.instructors});
}

//show
exports.show = function(req, res) {
  // req.query.id -> ?id=1
  // req.body -> pega do form através do comando post
  // req.params.id -> /:id pega o parametro na url

  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id;
  })

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return res.render("instructors/show", { instructor});

}

//create
exports.create = function(req, res){
  return res.render('instructors/create');
}

//post
exports.post = function(req, res){
  const keys = Object.keys(req.body)
  //["avatar_url",  "name",  "birth",  "gender",  "services"]

  // validação
  for(key of keys){
    req.body[key] // = req.body.avatar_url
    if (req.body[key] == "") {
      return res.send('Please, fill all fields!')
    }
  }
  

  // vai no req.body, desestruturar e pegar somente o que foi pedido
  let { avatar_url, birth, gender, services, name } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  
  let id = 1
  const lastInstructor = data.instructors[data.instructors.length - 1]

  if (lastInstructor) {
    id = lastInstructor.id + 1
  }

  data.instructors.push({
    id,
    name,
    avatar_url,
    birth,
    gender,
    created_at,
    services
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error!")
    return res.redirect("/instructors")
  })

  //return res.send(req.body);
}

//edit
exports.edit = function(req, res){
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id;
  })

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso
  }

  return res.render('instructors/edit', {instructor})
}

//put
exports.put = function(req, res){
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if (id == instructor.id){
      index = foundIndex
      return true
    }
  })

  if (!foundInstructor) return res.send("Instructor not found");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/instructors/${id}`)
  })

}

//delete
exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id;
  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error")

    return res.redirect('/instructors');
  })
}


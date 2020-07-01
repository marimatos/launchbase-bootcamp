const fs = require('fs');
const data = require('./data.json');
const { age, graduation, date } = require("./utils");
const Intl = require('intl');

//create
exports.post = function(req, res){
  const keys = Object.keys(req.body)  

  for(key of keys){
    req.body[key] // = req.body.avatar_url
    if (req.body[key] == "") {
      return res.send('Please, fill all fields!')
    }
  }

  let { avatar_url, birth, name, classType, degree, services} = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    name,
    avatar_url,
    birth,
    created_at,
    degree,
    classType,
    services
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error!")
    return res.redirect("/teachers")
  })

  //return res.send(req.body);
}

//show

exports.show = function(req, res) {
  const { id } = req.params;
  
  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id;
  })

  if (!foundTeacher) return res.send('Professor não encontrado!');
  
  const teacher = {
    ...foundTeacher,
    services: foundTeacher.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
    age: age(foundTeacher.birth),
    degree: graduation(foundTeacher.degree)
  }

  return res.render('teachers/show', { teacher });
}

//edit

exports.edit = function(req, res) {
  const { id } = req.params;
  
  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id;
  })

  if (!foundTeacher) return res.send('Professor não encontrado!');

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render('teachers/edit', {teacher})
}
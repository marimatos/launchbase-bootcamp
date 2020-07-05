const fs = require('fs');
const data = require('../data.json');
const { age, graduation, date } = require("../utils");
const Intl = require('intl');

exports.index = function(req, res){
  return res.render("Students/index", {Students: data.Students});
}

//create
exports.create = function(req, res) {
  return res.render('students/create');
}

//post
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
  const id = Number(data.students.length + 1);

  data.Students.push({
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
    return res.redirect("/Students")
  })

  //return res.send(req.body);
}

//show

exports.show = function(req, res) {
  const { id } = req.params;
  
  const foundStudent = data.Students.find(function(Student){
    return Student.id == id;
  })

  if (!foundStudent) return res.send('Professor não encontrado!');
  
  const Student = {
    ...foundStudent,
    services: foundStudent.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at),
    age: age(foundStudent.birth),
    degree: graduation(foundStudent.degree)
  }

  return res.render('Students/show', { Student });
}

//edit

exports.edit = function(req, res) {
  const { id } = req.params;
  
  const foundStudent = data.Students.find(function(Student){
    return Student.id == id;
  })

  if (!foundStudent) return res.send('Professor não encontrado!');

  const Student = {
    ...foundStudent,
    birth: date(foundStudent.birth)
  }

  return res.render('Students/edit', {Student})
}

//put
exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.Students.find(function(Student, foundIndex){
    if (id == Student.id){
      index = foundIndex
      return true
    }
  })

  if (!foundStudent) return res.send("Professor não encontrado");

  const Student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth)
  }

  data.Students[index] = Student

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/Students/${id}`)
  })
}

exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredStudents = data.Students.filter(function(Student) {
    return Student.id != id;
  })

  data.Students = filteredStudents

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error")

    return res.redirect('/Students');
  })
}
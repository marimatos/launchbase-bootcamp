const express = require('express')
const routes = express.Router()
const users = require('./app/controllers/general');
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')



//general
routes.get('/', users.index);
routes.get('/about', users.about);
routes.get('/recipes', users.recipes);
routes.get('/recipe/:id', users.details);
routes.get('/chefs', users.chefs);
routes.get('/chef/:id', users.chef);




//admin recipes
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

//admin chefs
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

module.exports = routes
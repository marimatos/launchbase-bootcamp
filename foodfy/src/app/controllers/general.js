const Recipe = require('../models/recipe')
const Chef = require('../models/chef')

module.exports = {
  index(req, res) {
    Recipe.all(function(recipes) {
      if (!recipes) return res.send("Recipe not found")
      return res.render("user/index", { recipes })

    })
  },
  about(req, res) {

    return res.render('user/about')
  },
  recipes(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 9
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {

        if (recipes.length == 0) {
          total = 1
        } else {
          total = Math.ceil(recipes[0].total / limit)
        }

        const pagination = {
            total,
            page
        }
        return res.render('user/recipes', { recipes, pagination, filter })
      }
    }
    Recipe.paginate(params)
  },
  details(req, res) {
    Recipe.find(req.params.id, function(recipe) {
        if (!recipe) return res.send("Recipe not found")
        return res.render("user/recipe", { recipe })

    })
  },
  chefs(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 12
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(chefs) {

        if (chefs.length == 0) {
          total = 1
        } else {
          total = Math.ceil(chefs[0].total / limit)
        }

        const pagination = {
          total,
          page
        }
        return res.render("user/chefs", { chefs, pagination, filter })
      }
    }
    Chef.paginate(params)
  },
  chef(req, res) {
    Chef.showChef(req.params.id, function(chef, recipes, totalRecipes) {
      if (chef.id == null) {
        totalRecipes = 0

        Chef.find(req.params.id, function(chef) {

          if (!chef) return res.send("Chef not found")

          return res.render("user/chef", { chef, totalRecipes })
        })
      } else {
          if (!chef) return res.send("Chef not found")
          return res.render("user/chef", { chef, recipes, totalRecipes })
      }
    })
  },
  results(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 9
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {

        if (recipes.length == 0) {
          total = 1
        } else {
          total = Math.ceil(recipes[0].total / limit)
        }

        const pagination = {
            total,
            page
        }
        return res.render('user/results', { recipes, pagination, filter })
      }
    }
    Recipe.paginate(params)
  }
}
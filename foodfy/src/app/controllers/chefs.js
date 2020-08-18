const { date } = require("../../lib/utils")
const Chef = require('../models/chef')

module.exports = {
    index(req, res) {
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

                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }
                return res.render("admin/chefs/index", { chefs, pagination, filter })
            }
        }
        Chef.paginate(params)
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        
            //validation
        for (key of keys) {
            //same as using req.body.avatar_url
            if (req.body[key] == "") {
                return res.send('Please, fill all fields.')

            }
        }
        Chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })

    },
    show(req, res) {

        Chef.showChef(req.params.id, function(chef, recipes, totalRecipes, chefId) {
            if (chef.id == null) {
                totalRecipes = 0

                Chef.find(req.params.id, function(chef) {

                    if (!chef) return res.send("Chef not found")

                    return res.render("admin/chefs/show", { chef, totalRecipes, chefId })
                })
            } else {
                if (!chef) return res.send("Chef not found")

                return res.render("admin/chefs/show", { chef, recipes, totalRecipes, chefId })
            }

        })

    },
    edit(req, res) {
        // Chef.find(req.params.id, function(chef) {
        //     if (!chef) return res.send("Chef not found")

        //     return res.render("admin/chefs/edit", { chef })

        // })

        Chef.showChef(req.params.id, function(chef, recipes, totalRecipes, chefId) {
            if (chef.id == null) {

                totalRecipes = 0
                Chef.find(req.params.id, function(chef) {
                    if (!chef) return res.send("Chef not found")
                    return res.render("admin/chefs/edit", { chefId, chef, totalRecipes })
                })
            } else {
                if (!chef) return res.send("Chef not found")
                return res.render("admin/chefs/edit", { chef, recipes, totalRecipes, chefId })
            }
        })

    },
    put(req, res) {
        const keys = Object.keys(req.body)
            //validation
        for (key of keys) {
            //same as using req.body.avatar_url
            if (req.body[key] == "") {
                return res.send('Please, fill all fields.')

            }

        }
        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`)
        })
    },

}
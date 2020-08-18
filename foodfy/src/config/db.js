const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "1234",
    host: "localhost",
    post: 5432,
    database: "foodfy"
})
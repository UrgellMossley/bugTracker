const Sequelize = require(`sequelize`)
const session = require("express-session");

const sequelize = new Sequelize(`bug-tracker`, `root`, `password`, {
    dialect: `mysql`,
    host: `localhost`,
    storage: `./session.mysql`
})

module.exports = sequelize;
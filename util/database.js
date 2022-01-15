const Sequelize = require(`sequelize`)

const sequelize = new Sequelize(`bug-tracker`, `root`, `password`, {
    dialect: `mysql`,
    host: `localhost`,
    storage: `./session.mysql`
})

module.exports = sequelize;
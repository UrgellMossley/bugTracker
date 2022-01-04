const Sequelize = require(`sequelize`)

const sequelize = new Sequelize(`bug-tracker`, `root`, `password`, {
    dialect: `mysql`,
    host: `localhost`
})

module.exports = sequelize;
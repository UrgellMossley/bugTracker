//import database config
const sequelize = require(`../util/database.js`)
//import Sequelize module
const Sequelize = require(`Sequelize`)
//define Ticket model
const Queue = sequelize.define(`Queue`,  {
    caseNo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Queue;
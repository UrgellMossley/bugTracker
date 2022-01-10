//import database config
const sequelize = require(`../util/database.js`)
//import Sequelize module
const Sequelize = require(`Sequelize`)
//define Ticket model
const Queue = sequelize.define(`Queue`,  {
    caseNo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        foreignKey:true,
        primaryKey: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: `ASSIGNED`
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    priority:{
        type: Sequelize.STRING,
        allowNull: false
    }    
});

module.exports = Queue;
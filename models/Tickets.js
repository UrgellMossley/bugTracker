//import database config
const sequelize = require(`../util/database.js`)
//import Sequelize module
const Sequelize = require(`Sequelize`)
//define Ticket model
const Ticket = sequelize.define(`Ticket`,  {
    caseNo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: `ASSIGNED`
    },
 /*  
 Sequelize will automatically generate created and updated fields in the Ticket table
 Will pull from there (hopefully)
 dateCreated:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    lastActioned:{
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
    }, */
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    priority:{
        type: Sequelize.STRING,
        allowNull: false
    }    
});

module.exports = Ticket;
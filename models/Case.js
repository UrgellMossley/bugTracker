//import database config
const sequelize = require(`../util/database.js`);
//import Sequelize module
const Sequelize = require(`Sequelize`);

const Case = sequelize.define(`Case`, {
    caseNo: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        foreignKey: true,
        primaryKey: true
    },
    caseDescription:{
        type: Sequelize.STRING,
        allowNull: true
    } ,
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: `ASSIGNED`
    }    
})

module.exports = Case;
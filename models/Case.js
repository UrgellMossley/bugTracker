//import database config
const sequelize = require(`../util/database.js`);
//import Sequelize module
const Sequelize = require(`Sequelize`);

const Case = sequelize.define(`Case`, {
    
    caseDescription:{
        type: Sequelize.TEXT,
        allowNull: false
    } ,
    caseNotes: {
        type: Sequelize.STRING(1234),
        allowNull: true
    },
    caseMessage: {
        type: Sequelize.TEXT,
        allowNull: true

    }
})

module.exports = Case;
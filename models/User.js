/* NB: As is convention uppercase Sequelize refers to module of Sequelize, while lower case is our initialisation */
//import Sequelize module

const Sequelize = require(`sequelize`);
//import initialisation of database 
const sequelize = require(`../util/database`);

//define User model
const User = sequelize.define(`User`,{
    firstName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    id:{
        type: Sequelize.UUID,
        defaultValue:  Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    hash:{
        type: Sequelize.STRING(512),
        allowNull: false,
    },
    salt:{
        type: Sequelize.STRING(512),
        allowNull: false
    }


});
//export the model
module.exports = User
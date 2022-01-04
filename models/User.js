/* NB: As is convention uppercase Sequelize refers to module of Sequelize, while lower case is our initialisation */
//import Sequelize module
const { UUIDV4 } = require("sequelize");
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
    }


});
//export the model
module.exports = User
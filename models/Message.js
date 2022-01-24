//defines our Message model
const sequelize = require("../util/database");
const Sequelize = require(`sequelize`);

const Message = sequelize.define(`Message`,{
    messages:{
        type: Sequelize.STRING,        
        allownull: false
    },
    facing:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: `internal`
    },
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
});
 module.exports = Message;
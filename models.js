const {connection} = require("../dbConnection/connection");
const {DataTypes} = require("sequelize");

//models
const ApplicationModel = connection.define("application", {

    id : {
        type: DataTypes.UUID,
        allowNull: false,
        require: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },

    owner: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        association: {

        }
    },

    api_products: {
        type: DataTypes.JSON,
        allowNull: false,
        require: true
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },

    updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },

    credential_id: {
        type: DataTypes.UUID,
        allowNull: false,
        require: true
    }
});

// associations


module.exports ={
    ApplicationModel
}

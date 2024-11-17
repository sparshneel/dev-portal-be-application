const uuid = require("uuid");
const Sequelize = require("sequelize");
const sequelize =  new Sequelize('application_creds', 'root', 'my-secret-pw', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


const CredentialModel = sequelize.define("credential",{
    id: {
        type: Sequelize.STRING,
        defaultValue: uuid.v4().toString(),
        primaryKey: true
    },

    type: {
        type: Sequelize.STRING,
        require: true
    },

    application_id: {
        type: Sequelize.STRING,
        require: false
    },

    is_active: {
        type: Sequelize.BOOLEAN,
        require: true,
        defaultValue: 1
    }
});

sequelize.sync().then(() => {
    console.log('Tables created successfully!');
}).catch((error) => {
    console.error('Unable to create tables : ', error);
});


module.exports = CredentialModel;
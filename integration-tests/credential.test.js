const {MySqlContainer} = require('@testcontainers/mysql')
const uuid = require('uuid')
const Sequelize = require("sequelize");
const secretGenerator = require("../credential/credential");

describe('Dev Portal Application Credential Integration Tests', () => {
    let mysqlContainer;
    let credential_id = uuid.v4().toString();
    let credentials;
    beforeAll(async () => {
        mysqlContainer = await new MySqlContainer().start();

        const sequelize =  new Sequelize(mysqlContainer.getDatabase(), mysqlContainer.getUsername(), mysqlContainer.getUserPassword(), {
            host: mysqlContainer.getHost(),
            dialect: 'mysql',
            port: mysqlContainer.getPort(),
        });

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });

        credentials = sequelize.define("credentials", {
            id: {
                type: Sequelize.STRING,
                defaultValue: uuid.v4().toString(),
                primaryKey: true
            },

            key: {
                type: Sequelize.STRING,
                allowNull: false
            },

            secretKey: {
                type: Sequelize.STRING,
                allowNull: false
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
        })

       await sequelize.sync().then(() => {
            console.log('Tables created successfully!');
        }).catch((error) => {
            console.error('Unable to create tables : ', error);
        });
    }, 150000);

    test("create credential", async () => {
        const cred = {
            id: credential_id,
            type: "application",
            updated_at: Date.now(),
            created_at: Date.now(),
            application_id: uuid.v4().toString(),
            key: uuid.v4().toString().toUpperCase(),
            secretKey: secretGenerator.generate_secret(32)
        };
        await credentials.create(cred).then(credNew => {
            console.log("credential: {} , is created successfully", cred);
            expect(cred.type).toEqual(credNew.type);
        }).catch(error => {
            console.log("error creating credential", error);
        })
    });


    test.skip("delete credential", async () => {
        await credentials.findOneAndDelete({
            id: credential_id,
        }).then(credential => {
            console.log("application: {} , is delete successfully", credential);
        }).catch(error => {
            console.log("error deleting application, the application may not exists in the database", error);
        })
    });

    afterAll(async () => {
        await mysqlContainer.stop().then(() => {
            console.log("mysql stopped");
        }).catch(error => {
            console.log("error stopping mysql container", error);
        })
    })

})


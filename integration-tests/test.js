const application = require('../models/applicationModels');
const {MongoDBContainer} = require('@testcontainers/mongodb')
const mongoose = require('mongoose')
const uuid = require('uuid')
const {request} = require('supertest')

describe('Dev Portal Application Integration Tests', () => {
    let mongoDBContainer;
    
    beforeAll(async () => {
        mongoDBContainer = await new MongoDBContainer("mongo:6.0.1").start();

        mongoose.connect(mongoDBContainer.getConnectionString(), {directConnection: true})
            .then(console.log("connected to the mongodb database"))
            .catch(error => {
                console.log("error connecting to the mongodb database", error);
            })
    });

    test("create application", async () => {
        const app = {
            id: uuid.v4().toString(),
            owner: "test",
            type: "internal",
            updated_at: Date.now(),
            created_at: Date.now(),
            api_products: ["test1", "test2"]
        };

        await application.create(app).then(application => {
            console.log("application: {} , is created successfully", application);
            expect(application.owner).toEqual(app.owner);
        }).catch(error => {
            console.log("error creating application", error);
        })

    });

    test("get application", async () => {

        await application.findOne({
            owner: "test",
        }).then(application => {
            expect(application.owner).toEqual("test");
        }).catch(error => {
            console.log("error fetching application", error);
        })

    });

    test("delete application", async () => {

        await application.findOneAndDelete({
            owner: "test",
        }).then(application => {
            console.log("application: {} , is delete successfully", application);
        }).catch(error => {
            console.log("error deleting application, the application may not exists in the database", error);
        })

    });

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoDBContainer.stop().then(() => {
            console.log("mongodb stopped");
        }).catch(error => {
            console.log("error stopping mongodb container", error);
        })
    })

})


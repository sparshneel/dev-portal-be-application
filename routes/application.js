const {v4: uuidv4} = require('uuid');
const express = require('express')
const router = express.Router()
const {ApplicationModel, CredentialModel} = require("../models/models");
const {Op} = require("sequelize");
const logger = require("pino")();
const {notify_updates} = require('../notification/notify.js');
const {generate_secret} = require('../credential/credential.js');

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        logger.info("fetching details for the application: {}", id)
        const application = await ApplicationModel.findOne({
            where: id
        })
        if (application == null)
            res.json().status(404)

        const credential = await CredentialModel.findOne({
            where: {
                [Op.and]: {
                    application_id: id,
                    is_active: 1
                }
            }
        })
        if (credential != null)
            application.set("credential", credential)

        res.json(application).status(200)
    } catch (e) {
        logger.error("Error fetching application details from the database, application: {}", id, e)
    }
});

router.post('/', async (req, res) => {
    const body = req.body
    const application_id = uuidv4()
    const credential_id = uuidv4()
    try {

        logger("Creating credential: {}, for application: {}", credential_id, application_id)
        const credential = CredentialModel.create({
            id: credential_id,
            username: uuidv4(),
            password: generate_secret(),
            type: "internal",
            is_active: 1,
            created_at: Date.now(),
            updated_at: Date.now(),
            application_id: application_id
        })

        logger("Creating application: {}, application owner: {}", application_id, body.get("owner"))
        const application = await ApplicationModel.create({
            id: application_id,
            name: body.get("name"),
            owner: body.get("owner"),
            api_products: body.get("api_products"),
            created_at: Date.now(),
            updated_at: Date.now(),
            credential: credential_id
        })

        // notify user
        await notify_updates({
            application_id: application_id,
            email: "user@gmail.com",
            owner: application.owner,
            event_type: "create",
            object: "Application",
            credentials: {
              username: credential["username"],
              password: credential["password"]
            },
            message: "Application: " + application_id + " is added for the user: " + application.owner
         })

        res.json(application).status(201)
    } catch (e) {
        logger.error("Error creating application, application owner: {}", body.get("owner"), e);
    }
});

router.put('/{id}', async (req, res) => {
    const id = req.params.id
    try {
        logger.info("updating details for the application: {}", id)
        const body = req.body
        const application = await ApplicationModel.upsert({
            id: id,
            name: body.get("name"),
            owner: body.get("owner"),
            api_products: body.get("api_products"),
            created_at: Date.now(),
            updated_at: Date.now()
        })
        res.json(application).status(200)
    } catch (e) {
        logger.error("Error updating details for the application: {}", id, e)
    }
});

router.delete('/{id}', async (req, res) => {
    const id = req.params.id
    try {
        logger.info("fetching details for the application: {}", id)
        const application = await ApplicationModel.destroy({
            where: id
        })

        // notify user
        await notify_updates({
            application_id: application["id"],
            email: "user@gmail.com",
            owner: application["owner"],
            event_type: "delete",
            object: "Application",
            message: "Application: " + application["id"] + " is deleted for the user: " + application["owner"]
                      + " and the credentials for the application are expired and cannot be used further."
        })

        res.json(application).status(204)
    } catch (e) {
        logger.error("Error deleting the application from the database, application: {}", id, e)
    }
});

module.exports = router;
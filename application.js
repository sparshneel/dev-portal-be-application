import router from "../index";
import {ApplicationModel} from "../models/models";
import { v4 as uuidv4 } from 'uuid';
const logger = require("pino")();


router.get('/:id', async (req,res) => {
    const id = req.params.id
    try{
        logger.info("fetching details for the application: {}", id)
        const application =  await ApplicationModel.findOne({
            where: id})
        res.json(application).status(200)
    } catch (e) {
        logger.error("Error fetching application details from the database, application: {}", id, e)
    }
});

router.post('/', async (req,res) => {
    try{
        const body = req.body
        logger("Creating application, application owner:{}",body.get("owner"))
        const application = await ApplicationModel.create({
            id: uuidv4(),
            name: body.get("name"),
            owner: body.get("owner"),
            api_products: body.get("api_products"),
            created_at: Date.now(),
            updated_at: Date.now()
        })
        res.json(application).status(201)
    }catch (e) {
        logger.error("Error creating application, application owner: {}", body.get("owner", e))
    }
});

router.put('/{id}', async (req,res) => {
    const id = req.params.id
    try{
        logger.info("updating details for the application: {}", id)
        const body = req.body
        const application = await ApplicationModel.upsert({
            id:id,
            name: body.get("name"),
            owner: body.get("owner"),
            api_products: body.get("api_products"),
            created_at: Date.now(),
            updated_at: Date.now()
        })
        res.json(application).status(200)
    }catch (e) {
        logger.error("Error updating details for the application: {}", id, e)
    }
});

router.delete('/{id}', async (req,res) => {
    const id = req.params.id
    try{
        logger.info("fetching details for the application: {}", id)
        const application =  await ApplicationModel.destroy({
            where: id})
        res.json(application).status(204)
    } catch (e) {
        logger.error("Error deleting the application from the database, application: {}", id, e)
    }
});


const  mongoose = require("mongoose")
const uuid = require("uuid")

const applicationModel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuid.v4().toString()
    },
    type: {
        type: String,
        required: true
    },
    api_products: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    credential: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    },
    custom_attributes: {
        type: mongoose.Schema.Types.Map
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now
    },
});

const Application =  mongoose.model("Application", applicationModel)

module.exports = Application;


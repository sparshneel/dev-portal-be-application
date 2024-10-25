const  mongoose = require("mongoose")

const applicationModel = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    apiProdcuts: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    credential: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    customeAttributes: {
        type: mongoose.Schema.Types.Map
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
});

const Application =  mongoose.model("Application", applicationModel)

module.exports = Application;


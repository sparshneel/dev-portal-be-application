const credentialModel = require("../models/credentialModels")
const uuid = require("uuid");

exports.getApplicationCredentials = async (request, response)  => {
    const credentials = await credentialModel.findAll({
        application_id: request.params.appId
    });
    response.status(200).json(credentials);
}

exports.generateApplicationCredential = async (request, response) => {
    const credntialRequest = {
        application_id: request.params.appId,
        id: uuid.v4().toString(),
        type: request.body.type
    }
    const credential = await credentialModel.create(credntialRequest);
    response.status(201).json(credential);
}

exports.getCredential = async (request, response)  => {
    const credential = await credentialModel.findById(request.params.id);
    response.status(200).json(credential);
}

exports.deleteCredential = async (request, response)  => {
    await credentialModel.findByIdAndDelete(request.params.id);
    response.status(204);
}


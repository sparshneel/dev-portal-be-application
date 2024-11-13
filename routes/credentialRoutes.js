const credentialModel = require("../models/credentialModels")

exports.getApplicationCredentials = async (request, response)  => {
    const credentials = await credentialModel.find({
        application_id: request.params.appId,
        is_active: 1
    });
    response.status(200).json(credentials);
}

exports.generateApplicationCredential = async (request, response) => {
    const credential = await credentialModel.create(request.body);
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


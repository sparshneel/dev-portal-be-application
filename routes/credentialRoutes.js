const credentialModel = require("../models/credentialModels")
const uuid = require("uuid");
const secretGenerator = require("../credential/credential");

exports.getApplicationCredentials = async (request, response)  => {
    const credentials = await credentialModel.findAll({
        application_id: request.params.appId
    });
    response.status(200).json(credentials);
}

exports.generateApplicationCredential = async (request, response) => {
    const credentialRequest = {
        application_id: request.params.appId,
        id: uuid.v4().toString(),
        type: request.body.type,
        key: uuid.v4().toString().toUpperCase(),
        secretKey: secretGenerator.generate_secret(32)
    }
    const credential = await credentialModel.create(credentialRequest);
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


const applicationModel = require("../models/applicationModels")

exports.getApplications = async (request, response)  => {
    const applications = await applicationModel.find({});
    response.status(200).json(applications)
}

exports.createApplication = async (request, response) => {
    const application = await applicationModel.create(request.body);
    response.status(200).json(application)
}

exports.getApplication = async (request, response)  => {
    const application = await applicationModel.findById(request.params.id);
    response.status(200).json(application)
}

exports.deleteApplication = async (request, response)  => {
    const application = await applicationModel.findByIdAndDelete(request.params.id);
    response.status(200).json(application)
}


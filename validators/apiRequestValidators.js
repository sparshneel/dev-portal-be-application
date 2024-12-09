const {body, header} = require("express-validator");
const jwt = require('jsonwebtoken');

const applicationValidation = [
    body('type', "cannot be blank").isEmpty(),
    body('api_products', "cannot be blank").isEmpty(),
    body('owner', "cannot be blank").isEmpty(),

    header('authorization', "Please provide auth token").isEmpty(),
];

const credentialValidation = [
    body('application_id', "cannot be blank").isEmpty(),

    header('authorization', "Please provide auth token").isEmpty(),
];

function validateToken(token) {
    if (jwt.verify(token, process.env.JWT_SECRET === true)) return 1;
    else return 0;
}

module.exports = {
    applicationValidation,
    credentialValidation
}
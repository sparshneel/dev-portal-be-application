const app = require("express")();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.port
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const {getApplications, createApplication, getApplication, deleteApplication} = require("./routes/applicationRoutes");
const {
    getApplicationCredentials,
    deleteCredential,
    getCredential,
    generateApplicationCredential
} = require("./routes/credentialRoutes");

mongoose.connect(process.env.mongodb_url)
    .then(console.log("connected to the mongodb database"))
    .catch(error => {
        console.log("error connecting to the database, cause: ", error);
    });

app.use(bodyParser.json());

app.get("/v1/application", getApplications)
app.get("/v1/application/:id", getApplication)
app.post("/v1/application", createApplication)
app.delete("/v1/application/:id", deleteApplication)

app.get("/v1/credential/:id", getCredential)
app.get("/v1/application/:id/credential", getApplicationCredentials)
app.post("/v1/application/:appId/credential", generateApplicationCredential)
app.delete("/v1/credential/:id", deleteCredential)


app.post("/v1/login", (request, response) => {
    const user = '{"username" : request.body.user}';
    const token = jwt.sign(user, process.env.APP_LOGIN_SECRET)
    response.status(201).json({"token": token});
});


app.listen(port, () => {
    try {
        console.log("server is running on port: ", port)
    } catch (error) {
        console.log("server could not start up error: {}", error)
    }
})

const  mongoose = require("mongoose")
const uuid = require("uuid/v4");

const CredentialModel = new mongoose.Schema ({

    id: {
        type: String,
        require: true,
        default: uuid.v4().toString()
    },

    type: {
        type: String,
        require: true
    },

    application_id: {
        type: String,
        require: false
    },

    is_active: {
        type: Boolean,
        require: true,
        default: 1
    },

    created_at: {
        type: Date,
        require: true
    },

    updated_at: {
        type: Date,
        require: true
    }
});

const credential = mongoose.model("Credential", CredentialModel);

module.exports = credential;
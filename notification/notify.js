const {ApplicationProducer} = require("../messaging/application-messaging.js")
const {ConfigProperties} = require('../config/config.js');

const notify_updates =  async function notify_application_updates(message) {
    await ApplicationProducer.connect()
    await ApplicationProducer.send({
        topic: ConfigProperties.get("kafka.topic.user.notify"),
        messages: [
            { value: message },
        ],
    })
}

module.exports ={
    notify_updates
}
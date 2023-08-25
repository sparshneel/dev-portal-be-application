const {Kafka} = require('kafkajs')
const {ConfigProperties}  =  require('../config/config.js')

const kafka = new Kafka({
    clientId: ConfigProperties.get("kafka.client.id"),
    brokers: [ConfigProperties.get("kafka.server")]
})

const ApplicationProducer = kafka.producer()

module.exports = {
    ApplicationProducer
}
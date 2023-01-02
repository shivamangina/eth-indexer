const { Kafka } = require("kafkajs");

// get dot env variables
const dotenv = require("dotenv");
dotenv.config();

const config = {
  clientId: process.env["topic"],
  brokers: [process.env["bootstrap.servers"]],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: "plain",
    username: process.env["sasl.username"],
    password: process.env["sasl.password"],
  },
};

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka(config);

exports.kafka = kafka;

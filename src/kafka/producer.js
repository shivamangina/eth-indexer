const { kafka, constants } = require("./kafka");

const producer = kafka.producer();

const runProducer = async (data) => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: constants.TOPIC,
    messages: [{ key: data.key, value: JSON.stringify(data.value) }],
  });
};

module.exports = { runProducer };

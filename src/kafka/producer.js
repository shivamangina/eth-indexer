const { kafka, constants } = require("./kafka");

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: constants.TOPIC,
    messages: [{ value: "Hello KafkaJS user 2!" }],
  });
};

run().catch(console.error);

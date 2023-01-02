const { kafka } = require("./kafka");

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "poems",
    messages: [{ value: "Hello KafkaJS user 2!" }],
  });
};

run().catch(console.error);

const { kafka } = require("./kafka");


const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "poems", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);

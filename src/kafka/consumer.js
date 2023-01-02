const { kafka, constants } = require("./kafka");

const consumer = kafka.consumer({ groupId: constants.GROUP_ID });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: constants.TOPIC, fromBeginning: true });

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

const { kafka } = require("./kafka");

const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "poems",
    messages: [{ value: "Hello KafkaJS user 2!" }],
  });

  // Consuming
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     })
  //   },
  // })
};

run().catch(console.error);

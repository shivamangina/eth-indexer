const { kafka, constants } = require("./kafka");
const Transaction = require("../mongo/schema");
const mongo = require("../mongo/mongo");

mongo.connect();

const consumer = kafka.consumer({ groupId: constants.GROUP_ID });

const runConsumer = async () => {
  // Consuming
  await consumer.connect();
  console.log("Consumer connected");
  await consumer.subscribe({ topic: constants.TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      if (message.value) {
        const transaction = JSON.parse(message.value);
        console.log('data: ', transaction);
        if (transaction.hash) {
          const {
            hash,
            type,
            blockHash,
            blockNumber,
            transactionIndex,
            confirmations,
            from,
            gasPrice, // bigNumber
            maxPriorityFeePerGas, // bigNumber
            maxFeePerGas, // bigNumber
            gasLimit, // bigNumber
            to,
            value, // bigNumber
            nonce,
            data,
            r,
            s,
            v,
            chainId,
          } = transaction;


          Transaction.create({
            hash,
            type,
            blockHash,
            blockNumber,
            transactionIndex,
            confirmations,
            from,
            gasPrice: JSON.stringify(gasPrice), // bigNumber
            maxPriorityFeePerGas: JSON.stringify(maxPriorityFeePerGas), // bigNumber
            maxFeePerGas: JSON.stringify(maxFeePerGas), // bigNumber
            gasLimit: JSON.stringify(gasLimit), // bigNumber
            to,
            value: JSON.stringify(value), // bigNumber
            nonce,
            data,
            r,
            s,
            v,
            chainId,
          });
        }
      }
    },
  });
};

runConsumer().catch(console.error);

const { configFromCli } = require("./config");
const { createConsumer } = require("./createConsumer");

async function consumerExample() {
  const config = await configFromCli();

  if (config.usage) {
    return console.log(config.usage);
  }

  console.log(`Consuming records from ${config.topic}`);

  let seen = 0;

  const consumer = await createConsumer(
    config,
    ({ key, value, partition, offset }) => {
      console.log(
        `Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}. Updated total count to ${++seen}`
      );
    }
  );

  consumer.subscribe([config.topic]);
  consumer.consume();

  process.on("SIGINT", () => {
    console.log("\nDisconnecting consumer ...");
    consumer.disconnect();
  });
}

consumerExample().catch((err) => {
  console.error(`Something went wrong:\n${err}`);
  process.exit(1);
});

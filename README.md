# Eth-indexer

This is a really simple indexer for Ethereum blockchain. It uses [Ethereum JSON-RPC] , Kafka and Mongo.

## How to run

Add env variables to .env file (see .env.example) and run the following commands:



```

npm install

#consumer
node src/kafka/consumer.js

#producer
node src/eth/ethers.js // will call producer for every block


```
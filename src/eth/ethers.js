const ethers = require("ethers");
const { runProducer } = require("../kafka/producer");

const provider = new ethers.providers.JsonRpcProvider(
  "https://side-fabled-violet.ethereum-goerli.discover.quiknode.pro/16bf13dae688d98d4fed25a482585b3ede55c6e0/"
);

provider.on("block", async (blockNumber) => {
  console.log(blockNumber);

  const transactions = await getTransactions(blockNumber);
  console.log(transactions.length);

  transactions.forEach((transaction) => {
    getTransaction(transaction).then((transactionData) => {
      runProducer({ key: transactionData.hash, value: transactionData });
    });
  });
});

//utils
// get transactions be blocknumber
const getTransactions = async (blockNumber) => {
  const block = await provider.getBlock(blockNumber);
  const transactions = block.transactions;
  return transactions;
};

// get transaction by hash
const getTransaction = async (hash) => {
  const transaction = await provider.getTransaction(hash);
  return transaction;
};

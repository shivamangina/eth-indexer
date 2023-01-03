const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    hash: String,
    type: Number,
    blockHash: String,
    blockNumber: Number,
    transactionIndex: Number,
    confirmations: Number,
    from: String,
    gasPrice: String, // bigNumber
    maxPriorityFeePerGas: String, // bigNumber
    maxFeePerGas: String, // bigNumber
    gasLimit: String, // bigNumber
    to: String,
    value: String, // bigNumber
    nonce: Number,
    data: String,
    r: String,
    s: String,
    v: Number,
    chainId: Number,
  },
  { timestamps: true, collection: "Transactions" }
);

module.exports = model("Transaction", transactionSchema);

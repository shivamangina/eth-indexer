const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    title: String,
    postdate: { type: Date, default: Date.now },
    author: { type: String, default: "Anon" },
  },
  { timestamps: true, collection: "Transactions" }
);

module.exports = model("Transaction", transactionSchema);

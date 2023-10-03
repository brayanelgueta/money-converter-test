const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    originValue: {
      type: Number,
    },
    convertionDate: {
      type: String,
    },
    moneyValue: {
      type: Number,
    },
    convertionValue: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);

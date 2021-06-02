const mongoose = require("mongoose");
const db = mongoose.connection;
const Schema = mongoose.Schema;

const farmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  products: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      amount: {
        type: Number,
      },
    },
  ],
});
const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;

const mongoose = require("mongoose");
const db = mongoose.connection;
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    default: "other",
    enum: ["fruit", "vegetable", "dairy", "other"],
  },
});
const Product = mongoose.model("Product", productSchema);

// Exports:
module.exports = Product;
module.exports.getProductById = Product.findById;
module.exports.createProduct = async function (pName, pPrice, pCat) {
  return await Product.create({
    name: pName,
    price: pPrice,
    category: pCat,
  });
};
module.exports.deleteProduct = Product.findByIdAndDelete;

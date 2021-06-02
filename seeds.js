// Mongoose
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open.");
  })
  .catch((err) => {
    console.log("Mongo Connection Error.", err);
  });
const db = mongoose.connection;

const Product = require("./models/product");
const Farm = require("./models/farm");

// Insert Seed Data:
// First: Empty DB

const deleteAll = async () => {
  await Product.deleteMany();
  await Farm.deleteMany();
};

const seedProducts = [
  { name: "apple", price: 4, category: "fruit" },
  { name: "orange", price: 3, category: "fruit" },
  { name: "cucumber", price: 2, category: "vegetable" },
  { name: "milk", price: 10, category: "dairy" },
];

const insertAll = async () => {
  const products = await Product.insertMany(seedProducts);
  for (let i = 0; i < 5; i++) {
    const farm = await Farm.create({
      name: `Farm ${i}`,
      location: `Street ${i}`,
      products: [{ item: products[i], amount: i }],
    });
  }
};

const go = async () => {
  await deleteAll();
  await insertAll();
};

go();

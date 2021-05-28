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

// Product
const Product = require("./models/product");

// Insert Seed Data:
// First: Empty DB

const deleteAll = () => {
  Product.deleteMany()
    .then(() => {
      console.log("seeds.js-> Deleted All.");
    })
    .catch(() => {
      console.log("seeds.js->Error in delete all.");
    });
};
deleteAll();
const seedProducts = [
  { name: "apple", price: 4, category: "fruit" },
  { name: "orange", price: 3, category: "fruit" },
  { name: "cucumber", price: 2, category: "vegetable" },
  { name: "milk", price: 10, category: "dairy" },
];
Product.insertMany(seedProducts)
  .then(() => {
    console.log("seeds.js-> Inserted Seeds.");
  })
  .catch(() => {
    console.log("seeds.js-> Error in insert seeds.");
  });

// Products
const Product = require("./models/product");

// Express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded());
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("index");
});

// Get All Products:
app.get("/products", (req, res) => {
  Product.getProducts
    .then((products) => {
      res.render("products/products", { products });
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

// Get Form - Create Product:
app.get("/products/new", (req, res) => {
  res.render("products/create-product");
});

// Get a Specific Product:
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.getProductById(id)
    .then((product) => {
      console.log(product);
      res.render("products/product", { product });
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

// Create Product:
app.post("/products", (req, res) => {
  // express.urlencoded(req.body);
  const { name, price, cat } = req.body;
  Product.createProduct(name, price, cat)
    .then((product) => {
      res.redirect("/products");
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

// Update Product:
app.patch("/products/:id", (req, res) => {
  const { price, category } = req.body;
  const id = req.params.id;
  Product.findByIdAndUpdate(
    id,
    { price: price, category: category },
    { runValidators: true }
  )
    .then((product) => {
      res.redirect(`/products/${id}`);
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

// Delete Product:
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await Product.deleteProduct(id)
    .then((product) => {
      res.redirect(303, "/products");
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

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

// Products
const Product = require("./models/product");

// Mongoose
const mongoose = require("mongoose");
require("./models/product");
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
app.get("/products", async (req, res) => {
  const categories = await Product.distinct("category");
  const filterCat = req.query.category;
  let findQuery = {};
  if (filterCat) findQuery.category = filterCat;
  await Product.find(findQuery)
    .then((products) => {
      res.render("products/products", { products, categories });
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

// Get Form - Create Product:
app.get("/products/new", async (req, res) => {
  const categories = await Product.schema.path("category").enumValues;
  res.render("products/create-product", { categories });
});

// Get a Specific Product:
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  let categories = await Product.schema.path("category").enumValues;
  Product.getProductById(id)
    .then((product) => {
      categories = categories.filter(
        (category) => category != product.category
      );
      res.render("products/product", { product, categories });
    })
    .catch((e) => {
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
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.deleteProduct(id)
    .then((product) => {
      res.redirect(303, "/products");
    })
    .catch((e) => {
      console.log(e);
      res.render("error", { e });
    });
});

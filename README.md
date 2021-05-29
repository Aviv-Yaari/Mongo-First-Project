
# First MongoDB Project
A simple, (hopefully) intuitive market products management app.


## Functions
> 1. `products.ejs`: View all products. Filter by category. 
![](https://i.ibb.co/FVSXnJT/Untitled.jpg)

> 2. `product.ejs`: Single product view/edit/delete form.
 ![](https://i.ibb.co/tCPZyb6/Untitled.jpg)

> 3. `create-product.ejs`: Create a new product.

![](https://i.ibb.co/BjP1DHG/Untitled.jpg)

## REST-based Architecture

URL | GET| POST | PATCH | DELETE
 -- | -- | ---- | ----- | ------
/products/:id | render `product.ejs` | - | update product details | delete product
/products | render `products.ejs` | create new product | - |  - |
/products/new | render `create-product.ejs` | - | - |  - |


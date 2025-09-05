const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const { listProducts, listProductsByCategorySlug,createProduct } = require("../controllers/productController");
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});
routerAPI.get("/products", listProducts); // GET /api/products
routerAPI.get("/categories/:slug/products", listProductsByCategorySlug); // GET /api/categories/:slug/products
routerAPI.post("/addProduct", createProduct); // POST /api/addProduct
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI; // export default

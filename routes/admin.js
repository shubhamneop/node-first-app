const express = require("express");
const path = require("path");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
} = require("../controllers/admin");
const router = express.Router();
const rooDir = require("../util/path");

router.get("/add-product", getAddProduct);
//res.sendFile(path.join(rooDir, "views", "add-product.html"));

router.post("/product", postAddProduct);
router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete", deleteProduct);

module.exports = router;

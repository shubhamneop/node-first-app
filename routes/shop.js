const express = require("express");
const path = require("path");
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  deleteCart,
  postOrders,
} = require("../controllers/shop");
const router = express.Router();
const rooDir = require("../util/path");

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);
router.post("/cart-item-delete", deleteCart);
router.post("/create-order", postOrders);
//res.sendFile(path.join(rooDir, "views", "shop.html"));

module.exports = router;

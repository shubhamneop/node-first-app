const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const desc = req.body.desc;
  // const product = new Product(null, title, imageUrl, price, desc);
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: desc,
    })
    .then((result) => {
      res.redirect("/");
      console.log(result);
    })
    .catch((err) => console.log(err));
  //console.log(product, req.body);
  // product.save().then(() => {
  //   res.redirect("/");
  // });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    // Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Products",
        path: "/admin/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId) //old without relation
    .then((products) => {
      const product = products?.[0];
      if (!product) {
        res.redirect("/");
      }
      console.log("prod", product);
      res.render("admin/edit-product", {
        pageTitle: "Edit Products",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const desc = req.body.desc;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = desc;
      return product.save();
    })
    .then((result) => {
      console.log("Product updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.warn(err);
    });
};

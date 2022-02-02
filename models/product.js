// // const fs = require("fs");
// // const path = require("path");
// // const Cart = require("./cart");
// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   "data",
// //   "products.json"
// // );
// // const getProductFromFile = (cb) => {
// //   fs.readFile(p, (err, fileData) => {
// //     if (err) {
// //       return cb([]);
// //     }
// //     cb(JSON.parse(fileData));
// //   });
// // };

// const db = require("../util/database");

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, desc) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.desc = desc;
//     this.price = price;
//   }
//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?,?)",
//       [this.title, this.price, this.imageUrl, this.desc]
//     );
//   }
//   static featchAll() {
//     return db.execute("SELECT * FROM products");
//   }
//   static deleteById(id) {}
//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }
//   // save() {
//   //   getProductFromFile((products) => {
//   //     if (this.id) {
//   //       const existingProductIndex = products.findIndex(
//   //         (prod) => prod.id === this.id
//   //       );
//   //       const updatedProducts = [...products];
//   //       updatedProducts[existingProductIndex] = this;
//   //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //         console.log("err", err);
//   //       });
//   //     } else {
//   //       this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), (err) => {
//   //         console.log("err", err);
//   //       });
//   //     }
//   //   });
//   // }
//   // static featchAll(cb) {
//   //   getProductFromFile(cb);
//   // }
//   // static deleteById(id) {
//   //   getProductFromFile((products) => {
//   //     const product = products.find((prod) => prod.id === id);
//   //     const updatedProducts = products.filter((p) => p.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //       if (!err) {
//   //         Cart.deleteProduct(id, product.price);
//   //       }
//   //     });
//   //   });
//   // }
//   // static findById(id, cb) {
//   //   getProductFromFile((products) => {
//   //     const product = products.find((p) => p.id === id);
//   //     cb(product);
//   //   });
//   // }
// };

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

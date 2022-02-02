// const logger = require('./logger');

// var sayHallo = function (name) {
//     console.log("Name " + name);
// }

// sayHallo('Shubham');

// var message = ""

// console.log(message);

// logger('Hi');

const fs = require("fs");

const routes = require("./routes");

const express = require("express");

const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const app = express();
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const path = require("path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const { get404 } = require("./controllers/error");

//handlebars
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
//app.set("view engine", "hbs");
//pug
//app.set("view engine", "pug");
app.set("view engine", "ejs");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRouter);

app.use(shopRouter);

app.use(get404);
//res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Shubham", email: "screendata@yopmail.com" });
    }
    return Promise.resolve(user);
  })
  // .then((user) => {
  //   return user.createCart();
  // })
  .then((user) => {
    app.listen(3001);
  })
  .catch((err) => console.log(err));

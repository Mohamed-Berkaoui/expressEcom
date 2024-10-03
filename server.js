const express = require("express");
const path = require("path");
require("dotenv").config();

const {
  getAllProducts,
  getSingleProduct,
  getAddProductFile,
  postAddProduct,
} = require("./controllers/productControllers");
const { client } = require("./utils/dbConnection");
const asyncHandler = require("./utils/asyncHandler");

//server creation
const app = express();

//set styles folder as a static folder
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({ extended: true }));
//routes
app.get("/", asyncHandler(getAllProducts));
app.get("/product/:id", asyncHandler(getSingleProduct));
app.route("/addproduct")
  .get(asyncHandler(getAddProductFile))
  .post(asyncHandler(postAddProduct));



//not found routes
app.all("*", function (req, res) {
  res.render("404");
});

//error handler
app.use(function (error, req, res, next) {
  res.render("error", { error });
});

const PORT = process.env.PORT || 8000;
client.connect()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    })
  )
  .catch((e) => {
    process.exit(1);
  });

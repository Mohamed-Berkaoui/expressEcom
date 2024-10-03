const { ObjectId } = require("mongodb");
const { productsCollection } = require("../utils/dbConnection");


async function getAllProducts(req, res,next) {

    const prods = await productsCollection.find().toArray();
    res.render("index", { products: prods });
  
}

async function getSingleProduct(req, res, next) {

    const product = await productsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    log
    if (!product) {
      throw new Error("no product with this id");
    }
    res.render("product", { product });
}

function getAddProductFile(req,res,next){
        res.render('addproduct')
    } 


async function postAddProduct(req,res,next){
    const product=req.body
    const insertedProduct=await productsCollection.insertOne(product)
    if(insertedProduct.insertedId<1){
        throw new Error('somthing went wrong')
    }
    res.redirect("/")
}




module.exports = { getAllProducts, getSingleProduct,getAddProductFile ,postAddProduct};

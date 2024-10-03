const { MongoClient } = require("mongodb")

const client=new MongoClient(process.env.DB_URI)
const productsCollection=client.db('ecommerce').collection('products')

module.exports={client,productsCollection}
const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1});
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
           return res.status(404).send('Ürün bulunamadı'); 
        }
        res.status(200).send(product);
    }catch (error) {
        console.log(error);
    }
}

const addProduct = async (req, res) => {
    try {
        const {...product} = req.body;
        console.log(product);
         await Product.create(product);
     
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
    }
  
}

const updateProduct = async (req, res) => {

    try {
        const {id} = req.params;
        const {...product} = req.body;
        await Product.findByIdAndUpdate(id, product);
        res.status(200).send('Ürün guncellendi');
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {

  

   try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).send('Ürün silindi');
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {getAllProducts, getProduct, addProduct, updateProduct, deleteProduct}
const epress = require("express");
const router = epress.Router();
const {getAllProducts,getProduct,addProduct,updateProduct, deleteProduct} = require("../controllers/productController");

router.get('/',getAllProducts);
router.post("/addproduct",addProduct);
router.get('/:id',getProduct);
router.post("/:id",deleteProduct);
router.put('/:id',updateProduct);








module.exports = router;
const express = require("express");
const routes = express.Router();

const {getAllProducts ,addProduct, updateProduct, deleteProduct, getProduct} = require('./controllers/product-controller');
const validation = require('./validations');

routes.get('/getAll',getAllProducts);
routes.get('/get/:id',getProduct)
routes.post('/add',validation.addProductValidation, addProduct);
routes.put('/update/:id',updateProduct);
routes.delete('/delete/:id',deleteProduct);


module.exports = routes;
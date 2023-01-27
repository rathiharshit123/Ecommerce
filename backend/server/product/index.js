const express = require("express");
const routes = express.Router();

const {getAllProducts ,addProduct, updateProduct, deleteProduct} = require('./controllers/product-controller');
const validation = require('./validations');

routes.get('/getAll',getAllProducts);
routes.post('/add',validation.addProductValidation, addProduct);
routes.put('/update',updateProduct);
routes.delete('/delete',deleteProduct);


module.exports = routes;
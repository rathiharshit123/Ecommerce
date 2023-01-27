const express = require("express");
const routes = express.Router();

const {getAllProducts ,addProduct, updateProduct, deleteProduct} = require('./controllers/product-controller');

routes.get('/getAll',getAllProducts);
routes.post('/add',addProduct);
routes.put('/update',updateProduct);
routes.delete('/delete',deleteProduct);


module.exports = routes;
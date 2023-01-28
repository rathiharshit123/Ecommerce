const express = require("express");
const routes = express.Router();

const controller = require('./controllers/product-controller');
const validation = require('./validations');

routes.get('/getAll',controller.getAllProducts);
routes.get('/get/:id',controller.getProduct)
routes.post('/add',validation.addProductValidation, controller.addProduct);
routes.put('/update/:id',controller.updateProduct);
routes.delete('/delete/:id',controller.deleteProduct);


module.exports = routes;
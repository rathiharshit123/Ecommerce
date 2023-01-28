const express = require("express");
const routes = express.Router();

const controller = require('./controllers/product-controller');
const validation = require('./validations');
const middleware = require("../middleware");

routes.get('/getAll',controller.getAllProducts);
routes.get('/get/:id',controller.getProduct)
routes.post('/add',middleware.validateAdminToken,validation.addProductValidation, controller.addProduct);
routes.put('/update/:id',controller.updateProduct);
routes.delete('/delete/:id',controller.deleteProduct);


module.exports = routes;
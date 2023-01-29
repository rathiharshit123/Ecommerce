const express = require("express");
const routes = express.Router();

const controller = require('./controllers/product-controller');
const validation = require('./validations');
const middleware = require("../middleware");

routes.get('/getAll',middleware.validateUserToken,controller.getAllProducts);
routes.get('/get/:id',middleware.validateUserToken,controller.getProduct)
routes.post('/reviews')
routes.post("/create/review",middleware.validateUserToken,controller.giveReview)

routes.post('/admin/add',middleware.validateAdminToken,validation.addProductValidation, controller.addProduct);
routes.put('/admin/update/:id',middleware.validateAdminToken,controller.updateProduct);
routes.delete('/admin/delete/:id',middleware.validateAdminToken,controller.deleteProduct);


module.exports = routes;
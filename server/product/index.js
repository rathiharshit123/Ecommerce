const express = require("express");
const routes = express.Router();

const controller = require('./controllers/product-controller');
const validation = require('./validations');
const middleware = require("../middleware");

routes.get('/getAll',controller.getAllProducts);
routes.get('/get/:id',controller.getProduct)

routes.post("/create/review",middleware.validateUserToken,validation.addReviewValidation ,controller.giveReview)
routes.get("/reviews",controller.getAllReviews)
routes.delete("/delete/review", middleware.validateUserToken, controller.deleteReview)

routes.post('/admin/add',middleware.validateAdminToken,validation.addProductValidation, controller.addProduct);
routes.put('/admin/update/:id',middleware.validateAdminToken,controller.updateProduct);
routes.delete('/admin/delete/:id',middleware.validateAdminToken,controller.deleteProduct);


module.exports = routes;
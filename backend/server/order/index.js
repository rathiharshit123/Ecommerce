const express = require("express");
const routes = express.Router();

const controller = require("./controllers/order-controller")
const middleware = require("../middleware");

routes.post("/new", middleware.validateUserToken, controller.createOrder);
routes.get("/get/:id",middleware.validateUserToken,controller.getOrder);
routes.get("/me",middleware.validateUserToken, controller.myOrders);

routes.get("/admin/getAll",middleware.validateAdminToken,controller.getAllOrders);
routes.put("/admin/update/:id",middleware.validateAdminToken,controller.updateOrder);
routes.delete("/admin/delete/:id",middleware.validateAdminToken,controller.deleteOrder);


module.exports = routes;
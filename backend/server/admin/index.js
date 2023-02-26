const express = require('express');
const routes = express.Router();

const controller = require("./controller/admin-controller");
const middleware = require("../middleware")
const validate = require("./validations");

routes.get("/get/users", middleware.validateAdminToken, controller.getAllUsers);

routes.get("/get/user/:id", middleware.validateAdminToken, controller.getUser);

routes.put("/update/user/:id",middleware.validateAdminToken, validate.updateProfile, controller.updateUser)

routes.delete("/delete/user/:id", middleware.validateAdminToken, controller.deleteUser)

routes.get('/get/products',middleware.validateAdminToken,controller.getAllProducts)


module.exports = routes
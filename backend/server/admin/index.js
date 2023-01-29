const express = require('express');
const routes = express.Router();

const controller = require("./controller/admin-controller");
const middleware = require("../middleware")

routes.get("/get/users", middleware.validateAdminToken, controller.getAllUsers);

routes.get("/get/user/:id", middleware.validateAdminToken, controller.getUser);

routes.put("/update/user/:id",middleware.validateAdminToken, controller.updateUser)

routes.delete("/delete/user/:id", middleware.validateAdminToken, controller.deleteUser)


module.exports = routes
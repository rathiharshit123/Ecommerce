const express = require("express");
const routes = express.Router();
const controller = require('./controllers/user-controller');
const middleware = require("../middleware")

routes.post('/register',controller.registerUser);
routes.post('/login',controller.login);
routes.get('/logout',middleware.validateUserToken,controller.logout)
routes.post('/forgot/password', controller.forgotPassword);
routes.put('/reset/password/:token',controller.resetPassword)


module.exports = routes;
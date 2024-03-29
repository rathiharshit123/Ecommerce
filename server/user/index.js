const express = require("express");
const routes = express.Router();

const controller = require('./controllers/user-controller');
const middleware = require("../middleware")
const validate = require("./validations")

routes.post('/register', validate.registerValidation, controller.registerUser);

routes.post('/login', validate.loginValidation, controller.login);

routes.get('/logout', middleware.validateUserToken, controller.logout)

routes.post('/forgot/password', validate.forgotPassword, controller.forgotPassword);

routes.put('/reset/password/:token', validate.resetPassword, controller.resetPassword);

routes.get('/me', middleware.validateUserToken, controller.getMyProfile)

routes.put('/update/password',  middleware.validateUserToken, validate.updatePassword, controller.updatePassword);

routes.put('/update/profile',middleware.validateUserToken, validate.updateProfile, controller.updateMyProfile)


module.exports = routes;
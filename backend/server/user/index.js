const express = require("express");
const routes = express.Router();
const controller = require('./controllers/user-controller');

routes.post('/register',controller.registerUser);
routes.post('/login',controller.login);
routes.post('/logout',controller.logout)



module.exports = routes;
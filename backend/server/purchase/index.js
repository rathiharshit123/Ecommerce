const express = require("express");
const router = express.Router();
const middleware = require("..//middleware")
const {initiatePurchase,getStripeApiKey} = require("./purchase-controller")

router.post("/initiatePurchase",middleware.validateUserToken, initiatePurchase)
router.get("/getKey",middleware.validateUserToken,getStripeApiKey)

module.exports(router);
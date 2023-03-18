const logger = require("../utils/logger");
const responseCode = require("../utils/response-code");
const utils = require("../utils/util");
const PaymentServices = require("./purchase-services");

const initiatePurchase = async (req,res) => {
    let responseObject = utils.responseFormat();
    try {
        let response = await PaymentServices.initatePurchase(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in initiate purchase controller");
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR); 
    }
    res.json(responseObject);
}   

const getStripeApiKey = async (req,res) => {
    let responseObject = utils.responseFormat();
    try {
        let response = await PaymentServices.getStripeApiKey(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getStripeApiKey controller");
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR); 
    }
    res.json(responseObject);
}   

module.exports = {
    initiatePurchase,
    getStripeApiKey,
}
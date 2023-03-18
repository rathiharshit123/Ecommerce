const constants = require("../utils/constants");
const logger = require("../utils/logger");
const responseCode = require("../utils/response-code");
const utils = require("../utils/util");
const stripeConfig = require("../../config/config").STRIPE;
const stripe = require("stripe")(stripeConfig.SECRET_KEY);

class PaymentServices {
    static async initatePurchase(req){
        let responseObject = utils.responseFormat();
        try {
            const {amount} = req.body;
            if(!amount || typeof(amount)!='number'){
                responseObject = utils.response(responseCode.INVALID_AMOUNT);
                return responseObject;
            }
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: constants.INDIAN_RUPPE,
                metadata: {
                    company: "Ecommerce"
                }
            })
            responseObject.data = {
                clientSecret : payment.client_secret
            }
            return responseObject
        } catch (error) {
            logger.error(error,"error in initate purchase Service")
            throw error;
        }
    }

    static async getStripeApiKey(req){
        try {
            let data = {
                stripeApiKey: stripeConfig.API_KEY
            }
            return utils.response(responseCode.SUCCESS,data);
        } catch (error) {
            logger.error(error,"Error in getStripeApiKey service")
        }
    }
}

module.exports = PaymentServices
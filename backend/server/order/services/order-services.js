const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util");
const orderModel = require("../models/order-model");

class OrderServices {
    static async createOrder (req){
        let responseObject = utils.responseFormat();
        try {
            const {
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            } = req.body;

            let order = await orderModel.save({
                shippingInfo,
                pinCode,
                phoneNumber,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                paidAt: Date.now(),
                userId: req.user._id
            })

            responseObject = utils.response(responseCode.SUCCESS,order,"Order Created succesfully");
        } catch (error) {
            logger.error(error,"Error in creatOrder Service");
            throw error
        }
        return responseObject;
    }

    static async myOrders (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in myOrders Service")
        }
    }

    static async getOrder (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in getOrder Service")
        }
    }

    static async getAllOrders (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in getAllOrders Service")
        }
    }

    static async updateOrder (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in updateOrder Service")
        }
    }

    static async deleteOrder (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in deleteOrder Service")
        }
    }
}

module.exports = OrderServices;
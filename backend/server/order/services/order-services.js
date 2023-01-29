const logger = require("../../utils/logger");
const utils = require("../../utils/util");

class OrderServices {
    static async createOrder (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in creatOrder Service")
        }
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
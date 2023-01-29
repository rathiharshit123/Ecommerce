const constants = require("../../utils/constants");
const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util");
const orderModel = require("../models/order-model");
const productModel = require("../../product/models/product-model");

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

            let order = await orderModel.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                status: constants.ORDER_STATUS.PROCESSING,
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

    static async myOrders (req){
        let responseObject = utils.responseFormat();
        try {
            const orderList = await orderModel.find({userId:req.user._id}).populate("userId","name email");
            let totalOrder = orderList.length;
            responseObject.data = {
                totalOrder,
                orderList,
            }
        } catch (error) {
            logger.error(error,"Error in myOrders Service");
            throw error
        }
        return responseObject;
    }

    static async getOrder (req){
        let responseObject = utils.responseFormat();
        try {
            const orderId = req.params.id;

            if(orderId.length!=24){
                responseObject = utils.response(responseCode.ORDER_NOT_FOUND);
                return responseObject;
            }

            const orderDetails = await orderModel.findById(orderId).populate("userId","name email");
            
            if(!orderDetails){
                responseObject = utils.response(responseCode.ORDER_NOT_FOUND);
                return responseObject
            }

            responseObject.data = {
                orderDetails,
            }
        } catch (error) {
            logger.error(error,"Error in getOrder Service")
            throw error
        }
        return responseObject
    }

    static async getAllOrders (requestObj){
        let responseObject = utils.responseFormat();
        try {
            let totalAmount =0;
            let orderList = await orderModel.find({});
            let totalOrders = orderList.length;
            orderList.forEach(order => {
                totalAmount+=order.totalPrice;
            });

            responseObject.data = {
                totalOrders,
                totalAmount,
                orderList,
            }
        } catch (error) {
            logger.error(error,"Error in getAllOrders Service")
        }
        return responseObject
    }

    static async updateOrder (req){
        let responseObject = utils.responseFormat();
        try {
            let orderId = req.params.id;
            let {status} = req.body;

            let dataToUpdate = {};

            if(orderId.length!=24){
                responseObject = utils.response(responseCode.ORDER_NOT_FOUND);
                return responseObject;
            }

            let orderDetails = await orderModel.findById(orderId)
            
            if(!orderDetails){
                responseObject = utils.response(responseCode.ORDER_NOT_FOUND);
                return responseObject;
            }

            if(orderDetails.status==constants.ORDER_STATUS.DELIVERED){
                responseObject = utils.response(responseCode.ORDER_ALREADY_DELIVERD);
                return responseObject;
            }

            let itemsArr = orderDetails.orderItems;
            
            for (let item of itemsArr) {
                await this.updateStock(item.productId,item.quantity);
            }
            
            dataToUpdate.status = status;
            if(status == constants.ORDER_STATUS.DELIVERED){
                dataToUpdate.deliverdAt = Date.now();
            }

            await orderModel.findByIdAndUpdate(orderId,dataToUpdate)
        } catch (error) {
            logger.error(error,"Error in updateOrder Service")
            throw error
        }
        return responseObject
    }

    static async deleteOrder (requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error(error,"Error in deleteOrder Service")
        }
    }

    static async updateStock(productId,quantity){
        try {
            const productDetails = await productModel.findById(productId);
            let updatedStock = productDetails.stock - quantity;
            await productModel.findByIdAndUpdate(productId,{stock: updatedStock});
        } catch (error) {
            logger.error("Error in updating the stock")
            throw error;
        }
    }
}

module.exports = OrderServices;
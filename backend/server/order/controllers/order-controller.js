const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util")
const OrderServices = require("../services/order-services")

const createOrder = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.createOrder(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in createOrder controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getOrder = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.getOrder(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getOrder controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const myOrders = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.myOrders(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in myOrders controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getAllOrders = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.getAllOrders(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getAllOrders controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updateOrder = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.updateOrder(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in updateOrder controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const deleteOrder = async function(req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await OrderServices.deleteOrder(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in deleteOrder controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

module.exports = {
    myOrders,
    createOrder,
    getOrder,
    getAllOrders,
    deleteOrder,
    updateOrder,
    
}
const logger = require("../../utils/logger");
const util =require("../../utils/util");
const path = require("path");
const responseCode = require('../../utils/response-code');

const ProductServices = require("../services/product-services");

const getAllProducts = async function(req,res) {
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.getAllProducts(req.query);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.error({
            error,
            methodName: "getAllProducts",
            path : path.basename(__filename)
        })
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const addProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.addProduct(req.query);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.error({
            error,
            methodName: "addProduct",
            path : path.basename(__filename)
        })
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updateProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.updateProduct(req.query);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.error({
            error,
            methodName: "updateProduct",
            path : path.basename(__filename)
        })
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const deleteProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.deleteProduct(req.query);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.error({
            error,
            methodName: "deleteProduct",
            path : path.basename(__filename)
        })
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
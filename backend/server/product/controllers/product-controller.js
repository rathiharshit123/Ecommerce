const logger = require("../../utils/logger");
const util =require("../../utils/util");
const responseCode = require('../../utils/response-code');

const ProductServices = require("../services/product-services");

const getAllProducts = async function(req,res) {
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.getAllProducts(req.query);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.info(error,"error in getAllProducts Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const addProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.addProduct(req);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.info(error,"error in addProduct Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updateProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.updateProduct(req);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.info(error,"error in updateProduct Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const deleteProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.deleteProduct(req);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.info(error,"error in deleteProduct Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getProduct = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.getProduct(req);
        responseObject = util.response(response.code,response.data);
    } catch (error) {
        logger.info(error,"error in getProduct Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const giveReview = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.createReview(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.info(error,"error in giveReview Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getAllReviews = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.getAllReviews(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.info(error,"error in getAllReviews Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const deleteReview = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await ProductServices.deleteReview(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.info(error,"error in deleteReview Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    giveReview,
    getAllReviews,
    deleteReview
}
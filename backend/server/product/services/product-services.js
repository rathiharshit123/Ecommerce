const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util");
const productModel = require("../models/product-model");
const ProductFeatures = require('../../utils/product-featutres');
const constants = require("../../utils/constants");
class ProductServices {
    static async getAllProducts(requestObj){
        let responseObject = utils.responseFormat();
        try {

            let resultPerPage = constants.MAX_PRODUCTS_PER_PAGE;
            const totalProducts = await productModel.countDocuments();

            const productFeatureObj = new ProductFeatures(productModel,requestObj);
            const allProducts =  await productFeatureObj.search().filter().pagination(resultPerPage).query;

            let data = {
                totalProducts,
                list: allProducts
            }
            responseObject.data = data;
        } catch (error) {
            logger.info(error)
            throw error;
        }
        return responseObject;
    }

    static async addProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            const product = await productModel.create(requestObj);
            responseObject.data = product;
        } catch (error) {
            logger.info(error)
            throw error;
        }
        return responseObject
    }

    static async updateProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            let {id} = requestObj.params;

            if(id.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            let product = await productModel.findById(id);
            
            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }
            
            product = await productModel.findByIdAndUpdate(id,requestObj.body,{
                new: true,
                runValidators: true,
                useFindAndModify: true,
            
            })
            responseObject.data = product;
        } catch (error) {
            logger.info(error)
            throw error;
        }
        return responseObject;
    }

    static async deleteProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            let {id} = requestObj.params;
            
            if(id.lenght!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            let product = await productModel.findById(id);
            
            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            await product.remove();
        } catch (error) {
            logger.info(error);
            throw error;
        }
        return responseObject;
    }

    static async getProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            let {id} = requestObj.params;
            
            if(id.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            let product = await productModel.findById(id);
            
            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            responseObject.data = product;
        } catch (error) {
            logger.info(error);
            throw error;
        }
        return responseObject;
    }
    
}

module.exports = ProductServices;
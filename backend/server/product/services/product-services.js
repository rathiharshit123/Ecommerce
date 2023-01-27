const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util");
const productModel = require("../models/product-model");
const path = require('path')
class ProductServices {
    static async getAllProducts(requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error({
                error,
                methodName: "getAllProducts",
                path : path.basename(__filename)
            })
        }
    }

    static async addProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            const product = await productModel.create(requestObj);
            responseObject.data = product;
        } catch (error) {
            logger.error({
                error,
                methodName: "addProduct",
                path : path.basename(__filename)
            })
            throw error;
        }
        return responseObject
    }

    static async updateProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error({
                error,
                methodName: "updateProduct",
                path : path.basename(__filename)
            })
        }
    }

    static async deleteProduct(requestObj){
        let responseObject = utils.responseFormat();
        try {
            
        } catch (error) {
            logger.error({
                error,
                methodName: "deleteProduct",
                path : path.basename(__filename)
            })
        }
    }
    
}

module.exports = ProductServices;
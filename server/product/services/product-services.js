const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util");
const productModel = require("../models/product-model");
const ProductFeatures = require('../../utils/product-featutres');
const constants = require("../../utils/constants");
const cloudinary = require("cloudinary");
class ProductServices {
    static async getAllProducts(requestObj){
        let responseObject = utils.responseFormat();
        try {

            let resultPerPage = constants.MAX_PRODUCTS_PER_PAGE;
            const totalProducts = await productModel.countDocuments();

            const productFeatureObj = new ProductFeatures(productModel.find(),requestObj);
            const filteredProducts =  await productFeatureObj.search().filter().query;
            let filteredProductsCount  = filteredProducts.length;

            const allProducts = await productFeatureObj.pagination(resultPerPage).query;

            let data = {
                totalProducts,
                resultPerPage,
                filteredProductsCount,
                list: allProducts,
            }
            responseObject.data = data;
        } catch (error) {
            logger.info(error)
            throw error;
        }
        return responseObject;
    }

    static async addProduct(req){
        let responseObject = utils.responseFormat();
        try {
            let images = [];

            if(typeof req.body.images === 'string') {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLink = [];

            for (const image of images) {
                const result = await cloudinary.v2.uploader.upload(image,{
                    folder: "products"
                })
                imagesLink.push({
                    publicId: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.images = imagesLink;

            let requestObj = req.body;
            let userDetails = req.user;
            const product = await productModel.create({
                ...requestObj,
                addedByName: userDetails.name,
                addedById: userDetails._id,
            });
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

            let images = [];

            if(typeof requestObj.body.images === 'string') {
                images.push(requestObj.body.images);
            } else {
                images = requestObj.body.images;
            }

            if(images) {
                for (const image of product.images) {
                    await cloudinary.v2.uploader.destroy(image.publicId);
                }

                let imagesLink = [];

                for (const image of images) {
                    const result = await cloudinary.v2.uploader.upload(image,{
                        folder: "products"
                    })
                    imagesLink.push({
                        publicId: result.public_id,
                        url: result.secure_url
                    })
                }
                requestObj.body.images = imagesLink;
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

            if(id.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            let product = await productModel.findById(id);
            
            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            for (const image of product.images) {
                await cloudinary.v2.uploader.destroy(image.publicId);
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

    static async createReview(req){
        let responseObject = utils.responseFormat();
        try {
            let {rating,comment,productId} = req.body;

            if(productId.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            const product = await productModel.findById(productId);

            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            let userReview = {
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment,
            }

            let dataToUpdate = {};

            let reviewArr = product.reviews;
            let numberOfReviews = product.numberOfReviews
            let avg = 0,
                totalRating = 0,
                isReviewed = false;

            reviewArr.forEach((review)=>{
                if(review.user.toString()==req.user._id) isReviewed = true;
            })

            if(isReviewed){
                reviewArr.forEach(review => {
                    if(review.user.toString() == req.user._id){
                        review.rating = rating;
                        review.comment = comment;
                    }
                });

            } else {
                reviewArr.push(userReview);
                numberOfReviews++;
            }
            
            reviewArr.forEach((review)=>{
                totalRating+=review.rating
            })

            avg = totalRating/reviewArr.length

            dataToUpdate = {
                reviews: reviewArr,
                numberOfReviews,
                ratings: avg
            }

            await productModel.findByIdAndUpdate(productId,dataToUpdate);
            responseObject = utils.response(responseCode.SUCCESS,{},'Review added sucessfully')
        } catch (error) {
            logger.error(error,"Error in createReview Service")
            throw error;
        }
        return responseObject;
    }
    
    static async getAllReviews(req){
        let responseObject = utils.responseFormat();
        try {
            let {productId} = req.query;
            if(productId.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            const product = await productModel.findById(productId);

            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }
            responseObject.data.reviews = product.reviews;
        } catch (error) {
            logger.error(error,"Error in createReview Service");
            throw error;
        }
        return responseObject;
    }

    static async deleteReview(req){
        let responseObject = utils.responseFormat();
        try {
            let {productId, reviewId} = req.query;

            if(productId.length!=24){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            const product = await productModel.findById(productId);

            if(!product){
                responseObject = utils.response(responseCode.PRODUCT_NOT_FOUND);
                return responseObject;
            }

            const reviewArr = product.reviews;

            let updatedReviewArr = reviewArr.filter((review)=>{
                return review._id.toString() != reviewId.toString()
            })

            let avg = 0;

            updatedReviewArr.forEach((review)=>{
                avg+= review.rating;
            })

            const ratings = avg/updatedReviewArr.length || 0
            const numberOfReviews = updatedReviewArr.length;

            let dataToUpdate = {
                reviews: updatedReviewArr,
                ratings,
                numberOfReviews
            }

            await productModel.findByIdAndUpdate(productId,dataToUpdate);

            responseObject = utils.response(responseCode.SUCCESS,{},"Review Deleted Successfully")

        } catch (error) {
            logger.error(error,"Error in deleteReview Service");
            throw error;
        }
        return responseObject;
    }
}

module.exports = ProductServices;
const logger = require("../../utils/logger");
const utils = require("../../utils/util");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const responseCode = require("../../utils/response-code");

class AdminServices {
    static async getAllUsers(req){
        let responseObject = utils.responseFormat();
        try {
            let totalUsers = await userModel.countDocuments();
            let userData = await userModel.find({});

            let data = {
                totalUsers,
                userData
            }
            responseObject.data = data;

        } catch (error) {
            logger.error(error,"Error in getAllUser service");
            throw error;         
        }
        return responseObject;
    }

    static async getUser(req){
        let responseObject = utils.responseFormat();
        try {
            let {id} = req.params;

            if(id.length!=24){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            let userData = await userModel.findById(id);

            if(!userData){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            responseObject.data = userData;

        } catch (error) {
            logger.error(error,"Error in getAllUser service");
            throw error;         
        }
        return responseObject;
    }

    static async updateUser(req){
        let responseObject = utils.responseFormat();
        try {
            let {id} = req.params;
            let {email,name,role} = req.body;
            if(id.length!=24){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            let userData = await userModel.findById(id);

            if(!userData){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            await userModel.findByIdAndUpdate(userData._id,{
                email,
                name,
                role
            })
            responseObject = utils.response(responseCode.SUCCESS,{},"Profile Updated Succesfully")

        } catch (error) {
            logger.error(error,"Error in updateUser in AdminService")
        }
    }

    static async deleteUser(req){
        let responseObject = utils.responseFormat();
        try {
            let {id} = req.params;

            if(id.length!=24){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            let userData = await userModel.findById(id);

            if(!userData){
                responseObject = utils.response(responseCode.USER_NOT_FOUND);
                return responseObject;
            }

            userModel.deleteOne({_id: userData._id});
            responseObject = utils.response(responseCode.SUCCESS,{},"Profile deleted Succesfully")
        } catch (error) {
            logger.error(error,"Error in updateUser in AdminService")
        }
    }
}

module.exports = AdminServices;
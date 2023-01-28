const logger = require("../../utils/logger");
const utils = require("../../utils/util");
const userModel = require("../models/user-model");
const responseCode = require("../../utils/response-code");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../../../config/config");

class UserServices{
    static async    registerUser(requestObj){
        let responseObject = utils.responseFormat();
        try {
            const {name,email,password} = requestObj;

            const checkUserExist = await userModel.findOne({email});

            if(checkUserExist){
                responseObject = utils.response(responseCode.EMAIL_ALREADY_EXIST);
                return responseObject;
            }

            let hashedPassword = await this.getHashPassword(password);

            const user = await userModel.create({
                name,
                email,
                password: hashedPassword,
                avatar: {
                    publicId: "Sample Id",
                    url: "SampleUrl"
                }
            })

            let token = this.createToken(user._id);
            let data = {
                token,
                user,
            }
            responseObject.data = data;
        } catch (error) {
            logger.error(error);
            throw error;
        }
        return responseObject
    }

    static async login(requestObj){
        try {
            
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
    
    static async logout(requestObj){
        try {
            
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async getHashPassword(password){
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            return hashPassword;
        } catch (error) {
            console.log({
                error,
                msg: "error on hashing password - getHashPassword"
            })
            throw error;
        }
    }

    static createToken( userId) {
        try {
            userId = userId.toString();
            let tokenValue = {
                userId,
            };
            let token = jwt.sign(tokenValue, config.JWT_SECRET,{expiresIn: config});
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserServices;
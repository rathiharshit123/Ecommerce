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
            const {name,email,password,avatar} = requestObj;

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
                avatar
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
        let responseObject = utils.responseFormat();
        try {
            let {email,password} = requestObj;

            let user = await userModel.findOne({email}).select("+password");;

            if(!user){
                responseObject = utils.response(responseCode.INVALID_CREDENTIALS);
                return responseObject;
            }

            let passwordMatch = await bcrypt.compare(password,user.password);

            if(!passwordMatch){
                responseObject = utils.response(responseCode.INVALID_CREDENTIALS);
                return responseObject;
            }

            let token = this.createToken(user._id);
            let data ={
                token,
                user
            }
            responseObject.data = data;
        } catch (error) {
            logger.error(error);
            throw error;
        }
        return responseObject;
    }
    
    static async logout(req){
        let responseObject = utils.responseFormat();
        try {
            res.cookies('token',null,{
                expires: Date.now(),
                httpOnly: true,
            })

            responseObject = utils.response(responseCode.LOGOUT_SUCCESFULL);
            return responseObject;

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
            logger.error(error);
            throw error;
        }
    }

    static createToken( userId) {
        try {
            userId = userId.toString();
            let tokenValue = {
                userId,
            };
            let token = jwt.sign(tokenValue, config.JWT_SECRET,{expiresIn: config.JWT_EXPIRY});
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserServices;
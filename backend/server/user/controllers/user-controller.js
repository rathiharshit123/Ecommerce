const logger = require("../../utils/logger");
const responseCode = require("../../utils/response-code");
const utils = require("../../utils/util")
const config = require("../../../config/config")
const UserServices = require("../services/user-services");

const registerUser = async function (req,res) {
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.registerUser(req.body);
        responseObject = utils.response(response.code,response.data);
    } catch (error) {
        logger.error(error);
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    if(responseObject?.data?.token){
        let token = responseObject.data.token;
        let options = {
            expires: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('token',token,options).json(responseObject);
    }
    else{
        res.json(responseObject);
    }
}

const login = async function (req,res) {
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.login(req.body);
        responseObject = utils.response(response.code,response.data);
    } catch (error) {
        logger.error(error);
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    if(responseObject?.data?.token){
        let token = responseObject.data.token;
        let options = {
            expires: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('token',token,options).json(responseObject);
    }
    else{
        res.json(responseObject);
    }
}

const logout = async function (req,res) {
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.logout(req.body);
        responseObject = utils.response(response.code,response.data);
    } catch (error) {
        logger.error(error);
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}



module.exports = {
    registerUser,
    login,
    logout,
}
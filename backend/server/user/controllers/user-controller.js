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
        logger.error(error,"Error in registerUser Controller");
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
        logger.error(error,"Error in login Controller");
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
        await res.cookie('token',null,{
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        responseObject = utils.response(responseCode.LOGOUT_SUCCESFULL);
    } catch (error) {
        logger.error(error,"Error in logout Controller");
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const forgotPassword = async function (req,res) {
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.forgotPassword(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in forgotPassword Controller");
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const resetPassword = async function (req,res) {
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.resetPassword(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in resetPassword Controller");
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getMyProfile = async function (req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.getMyProfile(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getMyProfile Controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updatePassword = async function (req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.updatePassword(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in updatePassword Controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updateMyProfile = async function (req,res){
    let responseObject = utils.responseFormat();
    try {
        const response = await UserServices.updateMyProfile(req);
        responseObject = utils.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in updateMyProfile Controller")
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}


module.exports = {
    registerUser,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getMyProfile,
    updateMyProfile,
    updatePassword
}
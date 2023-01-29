const logger = require("../../utils/logger");
const util =require("../../utils/util");
const responseCode = require('../../utils/response-code');
const AdminServices = require("../services/admin-services")


const getAllUsers = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await AdminServices.getAllUsers(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getAllUsers Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const getUser = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await AdminServices.getUser(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in getUser Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const updateUser = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await AdminServices.updateUser(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in updateUser Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

const deleteUser = async function(req,res){
    let responseObject = util.responseFormat();
    try {
        let response = await AdminServices.deleteUser(req);
        responseObject = util.response(response.code,response.data,response.message);
    } catch (error) {
        logger.error(error,"Error in deleteUser Controller")
        responseObject = util.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}
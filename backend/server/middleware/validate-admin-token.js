const responseCode = require('../utils/response-code');
const utils = require("../utils/util");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const userModel = require("../user/models/user-model");

const validateAdminToken = async function(req,res,next){
    let responseObject = utils.responseFormat();
    try {
        const {token} = req.cookies;
    
        if(!token){
            responseObject= utils.response(responseCode.AUTHENTICATION_FAILED);
            res.json(responseObject);
        }

        let decodedData = jwt.verify(token,config.JWT_SECRET);
        if(decodedData){
            let userDetails = await userModel.findById(decodedData.userId);
            if(userDetails.role == 'admin'){
                req.user = userDetails;
                return next();
            }
        }
    } catch (error) {
        responseObject= utils.response(responseCode.AUTHENTICATION_FAILED);
        res.json(responseObject);
    }
    return res.json(utils.response(responseCode.AUTHENTICATION_FAILED));
}

module.exports = validateAdminToken;
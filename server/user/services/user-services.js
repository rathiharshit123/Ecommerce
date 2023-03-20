const logger = require("../../utils/logger");
const utils = require("../../utils/util");
const userModel = require("../models/user-model");
const responseCode = require("../../utils/response-code");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../../../config/config");
const crypto = require("crypto");
const constants = require("../../utils/constants");
const sendEmail = require("../../utils/send-email");
const cloudinary = require("cloudinary");
class UserServices{
    static async registerUser(requestObj){
        let responseObject = utils.responseFormat();
        try {
            const {name,email,password,avatar} = requestObj;
            
            const checkUserExist = await userModel.findOne({email});
            if(checkUserExist){
                responseObject = utils.response(responseCode.EMAIL_ALREADY_EXIST);
                return responseObject;
            }

            let imageDetails = {};
            if(avatar){
                const myCloud = await cloudinary.v2.uploader.upload(avatar,{folder: "avatars",width: 150,crop: "scale"})
                imageDetails = {
                    publicId: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
            

            let hashedPassword = await this.getHashPassword(password);

            const user = await userModel.create({
                name,
                email,
                password: hashedPassword,
                avatar: imageDetails,
            })

            let token = this.createToken(user._id);
            let data = {
                token,
                userDetails: user
            }
            responseObject.data = data;
        } catch (error) {
            logger.error(error,"Error in registerUser Service");
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
            let data = {
                token,
                userDetails: user
            }
            responseObject.data = data;
        } catch (error) {
            logger.error(error,"Error in login Service");
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
            logger.error(error,"Error in logut Service");
            throw error;
        }
    }

    static async getHashPassword(password){
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            return hashPassword;
        } catch (error) {
            logger.error(error,"Error in getHashPassword Service");
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
            logger.error(error,"Error in createToken Service")
            throw error;
        }
    }

    static async forgotPassword(req){
        let responseObject = utils.responseFormat();
        try {
            let {email} = req.body;
            var user = await userModel.findOne({email});

            if(!user){
                responseObject = utils.response(responseCode.CANNNOT_FIND_ACCOUNT);
                return responseObject;
            }

            const resetToken = crypto.randomBytes(20).toString("hex");

            let resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
            let resetPasswordExpire = Date.now() + constants.RESET_PASSWORD_EXPIRE_TIME;

            await userModel.findByIdAndUpdate(user._id,{
                resetPasswordExpire,
                resetPasswordToken,
            })

            const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/user/password/reset/${resetToken}`
            
            const emailMessage = `Your reset password url is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email, please ignore it. \n Please note this link is valid for 15 minutes only`
            
            try {
                let emailResponse = await sendEmail({
                    email,
                    subject: "Ecommerce Password Recovery",
                    message: emailMessage,
                })

                if(emailResponse?.status){
                    responseObject = utils.response(responseCode.EMAIL_SENT_SUCCESFULLY,{},`Email sent to ${email} successfully`)    
                    return responseObject;
                }
                else{
                    responseObject = utils.response(responseCode.UNABLE_TO_SEND_EMAIL);
                }
            } catch (error) {
                logger.error(error,"Error in sending mail through nodemailer");
                await userModel.findByIdAndUpdate(user._id,{
                    resetPasswordExpire: null,
                    resetPasswordToken: null,
                })
                throw error;
            }
            return responseObject;

        } catch (error) {
            logger.error(error,"Error in forgotPassword Service");
            throw error;
        }
    }

    static async resetPassword(req){
        let responseObj = utils.responseFormat();
        try {
            let {password, confirmPassword} = req.body;
            let {token} = req.params;
            
            const resetPasswordToken = crypto.createHash("sha256").update(token).digest('hex');
            const user = await userModel.findOne({
                resetPasswordToken,
                resetPasswordExpire: {$gt: Date.now()}
            })
            
            if(!user){
                responseObj = utils.response(responseCode.FORGOT_PASSWORD_TOKEN_INVALID);
                return responseObj;
            }
            
            if(password != confirmPassword){
                responseObj = utils.response(responseCode.PASSWORD_DOES_NOT_MATCH);
                return responseObj;
            }

            let hashedPassword = await this.getHashPassword(password);
            await userModel.findByIdAndUpdate(user._id,{
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpire: null,
            })
            responseObj = utils.response(responseCode.SUCCESS,{},'Password Changed Succesfully')
        } catch (error) {
            logger.error(error,"Error in resetPassword Service");
            throw error;
        }
        return responseObj;
    }

    static async getMyProfile(req){
        let responseObject = utils.responseFormat();
        try {
            if(!req.user){
                responseObject = utils.response(responseCode.CANNNOT_FIND_ACCOUNT);
                return responseObject;
            }
            let user = await userModel.findById(req.user._id);
            let {token} = req.cookies
            let data = {
                token,
                userDetails: user
            }
            responseObject.data = data;
            return responseObject;
        } catch (error) {
            logger.error(error,"Error in get my Profile service")
            throw error;
        }
    }

    static async updatePassword(req){
        let responseObject = utils.responseFormat();
        try {
            let {oldPassword,newPassword,confirmPassword} = req.body;

            const user = await userModel.findById(req.user._id).select("+password");
            let passwordMatch = await bcrypt.compare(oldPassword,user.password);

            if(!passwordMatch){
                responseObject = utils.response(responseCode.INVALID_PASSWORD);
                return responseObject;
            }

            if(newPassword!=confirmPassword){
                responseObject = utils.response(responseCode.PASSWORD_DOES_NOT_MATCH);
                return responseObject;
            }

            let hashedPassword = await this.getHashPassword(newPassword);

            await userModel.findByIdAndUpdate(user._id,{
                password: hashedPassword,
            })
            responseObject = utils.response(responseCode.SUCCESS,{},"Password Changed Succsefully")

        } catch (error) {
            logger.error(error,"Error in updatePassword Service")
            throw error;
        }
        return responseObject;
    }

    static async updateMyProfile(req){
        let responseObject = utils.responseFormat();
        try {
            let {name,email ,avatar} = req.body;

            let checkEmailExist = await userModel.findOne({email});

            if(checkEmailExist){
                responseObject = utils.response(responseCode.EMAIL_ALREADY_EXIST);
                return responseObject;
            }
            
            const user = await userModel.findById(req.user._id);

            let toUpdate = {
                name,
                email
            }
            if(avatar){
                let r = await cloudinary.v2.uploader.destroy(user.avatar.publicId);
                const myCloud = await cloudinary.v2.uploader.upload(avatar,{folder: "avatars",width: 150,crop: "scale"})
                toUpdate.avatar = {
                    publicId: myCloud.public_id,
                    url: myCloud.url,
                }
            }

            let res = await userModel.findByIdAndUpdate(user._id,
                toUpdate
            )
            responseObject = utils.response(responseCode.SUCCESS,{},"Profile Updated Succesfully")
        } catch (error) {
            logger.error(error,"Error in updateMyProfile  Service");
            throw error;
        }
        return responseObject;
    }
}

module.exports = UserServices;
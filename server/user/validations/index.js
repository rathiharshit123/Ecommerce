const loginValidation = require('./login-validation');
const registerValidation = require('./register-validation');
const forgotPassword = require('./forgot-password-validation');
const resetPassword = require("./reset-password-validation");
const updateProfile = require("./update-profile-validation");
const updatePassword = require("./update-password-validation");

module.exports = {
    loginValidation,
    registerValidation,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile
}
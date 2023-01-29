const connection = require("../../utils/mongo-connection").connection;
const mongoose = require("mongoose");
const crypto = require("crypto");
const constants = require("../../utils/constants");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [30],
        minLength: [3],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minLength: [8],
        select: false,
    },
    avatar: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{
    timestamps: true,
})

userschema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + constants.RESET_PASSWORD_EXPIRE_TIME;
}

module.exports = connection.model("User",userschema)
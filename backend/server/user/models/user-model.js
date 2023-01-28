const connection = require("../../utils/mongo-connection").connection;
const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

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

module.exports = mongoose.model("User",userschema)
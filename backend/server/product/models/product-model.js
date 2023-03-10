const connection = require('../../utils/mongo-connection').connection
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxLength: 8,
    },
    ratings:{
        type: Number,
        default: 0,
    },
    images: [
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    stock: {
        type:Number,
        required: true,
        maxLength: 4,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    addedByName: {
        type: String,
        required: true,
    },
    addedById:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ]
},{
    timestamps: true
})

module.exports = connection.model('Product',productSchema,"")
const Joi = require("@hapi/joi");

let imageObject = Joi.object().keys({
    publicId: Joi.string().required(),
    url: Joi.string().required()
})

let reviewObject = Joi.object().keys({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
})

module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            ratings: Joi.number().default(0),
            category: Joi.string().required(),
            stock: Joi.number().required(),
            images: Joi.array().items(imageObject).optional(),
            numberOfReviews: Joi.number().default(0),
            reviews: Joi.array().items(reviewObject).optional()
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
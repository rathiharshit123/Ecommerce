const Joi = require("@hapi/joi");

let shippingInfoSchema = Joi.object().keys({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.number().required(),
    phoneNo: Joi.string().length(10).regex(/^[0-9]+$/).required(),
})

let orderItemSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string().required(),
    stock: Joi.number().optional(),
    product: Joi.string().required()
})

let paymentInfoSchema = Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.string().default("INITIATED"),
})
module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            shippingInfo: shippingInfoSchema.required(),
            orderItems: Joi.array().items(orderItemSchema).required(),
            paymentInfo: paymentInfoSchema.required(),
            itemsPrice: Joi.number().default(0),
            shippingPrice: Joi.number().default(0),
            taxPrice: Joi.number().default(0),
            totalPrice: Joi.number().default(0),
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
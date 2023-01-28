const Joi = require("@hapi/joi");


module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            name : Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            avatar: Joi.object.keys({
                publicId: Joi.string().required(),
                url: Joi.string().required()
            })
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
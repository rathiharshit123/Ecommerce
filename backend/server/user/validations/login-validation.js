const Joi = require("@hapi/joi");


module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
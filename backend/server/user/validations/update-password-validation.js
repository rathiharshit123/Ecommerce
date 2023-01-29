const Joi = require("@hapi/joi");


module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            oldPassword: Joi.string().required().min(8),
            newPassword: Joi.string().required().min(8),
            confirmPassword: Joi.string().required().min(8),
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
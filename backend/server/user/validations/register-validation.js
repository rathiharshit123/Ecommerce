const Joi = require("@hapi/joi");


module.exports = async (req,res,next)=>{
    try {
        const schema = Joi.object().keys({
            name : Joi.string().required().min(3).max(30),
            password: Joi.string().required().min(8),
            email: Joi.string().email(),
            avatar: Joi.string().optional()
        })
        req.body = await Joi.validate(req.body,schema);
        next();
    } catch (error) {
        return res.json(error.details[0]);
    }
}
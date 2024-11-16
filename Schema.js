const Joi = require('joi');
const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "secretary", "generalManager", "headofMarket").required(),
});
const { error } = schema.validate(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });

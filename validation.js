//VALIDATION
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

//POST/PUT Item validation
const postput_itemValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(data);
};

//POST/PUT Credit validation
const postput_creditValidation = (data) => {
    const schema = Joi.object({
        owner: Joi.string().min(1).required(),
        email: Joi.string().min(6).required().email(),
        value: Joi.number().min(0).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postput_itemValidation = postput_itemValidation;
module.exports.postput_creditValidation = postput_creditValidation;
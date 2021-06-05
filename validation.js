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
        name: Joi.string().required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(data);
};

//POST/PUT Credit validation
const postput_creditValidation = (data) => {
    const schema = Joi.object({
        owner: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        value: Joi.number().min(0).required()
    });
    return schema.validate(data);
};

//POST Receipt calidation
const post_receiptValidation = (data) => {
    const schema = Joi.object({
        buyer: Joi.string().required(),
        items: Joi.required(),
        total_price: Joi.number().required(),
        staff: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postput_itemValidation = postput_itemValidation;
module.exports.postput_creditValidation = postput_creditValidation;
module.exports.post_receiptValidation = post_receiptValidation;
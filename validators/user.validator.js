const Joi = require('joi');

const { constants } = require('../configs/index');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),

    password: Joi.string().regex(constants.PASSWORD_REGEXP)
        .trim()
        .required(),

    email: Joi.string().regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim(),
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP)
        .trim(),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};

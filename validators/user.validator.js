const Joi = require('joi');

const { constants, userRolesEnum } = require('../configs');

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
    role: Joi.string().allow(...Object.values(userRolesEnum)),
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim(),
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP)
        .trim(),
    book: Joi.array(),
});

const paramsUserValidator = Joi.object({
    user_id: Joi.string().regex(constants.ID_REGEXP).required()
});

const passwordValidator = Joi.object({
    password: Joi.string().regex(constants.PASSWORD_REGEXP).trim().required(),
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    paramsUserValidator,
    passwordValidator
};

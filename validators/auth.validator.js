const Joi = require('joi');

const { constants } = require('../configs');

const loginValidator = Joi.object({
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(constants.PASSWORD_REGEXP)
        .trim().required()
});

module.exports = {
    loginValidator
};

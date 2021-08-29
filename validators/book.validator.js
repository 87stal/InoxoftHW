const Joi = require('joi');

const { constants } = require('../configs/index');

const createBookValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(40)
        .trim()
        .required(),

    author: Joi.string().alphanum().min(2).max(40)
        .trim()
        .required(),

    year: Joi.number().integer().min(constants.CURRENT_YEAR - 2000).max(constants.CURRENT_YEAR)
        .required(),

    pages: Joi.number().integer().min(5).max(2000)
        .required()

});

const updateBookValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(40)
        .trim(),

    author: Joi.string().alphanum().min(2).max(40)
        .trim(),

    year: Joi.number().integer().min(constants.CURRENT_YEAR - 2000).max(constants.CURRENT_YEAR),
});

module.exports = { createBookValidator, updateBookValidator };

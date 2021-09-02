const Joi = require('joi');

const { constants } = require('../configs');

const createBookValidator = Joi.object({
    name: Joi.string().min(2).max(40)
        .trim()
        .required(),

    author: Joi.string().min(2).max(40)
        .trim()
        .required(),

    year: Joi.number().integer().min(constants.CURRENT_YEAR - 2000).max(constants.CURRENT_YEAR)
        .required(),

    pages: Joi.number().integer().min(5).max(2000)
        .required()

});

const updateBookValidator = Joi.object({
    name: Joi.string().min(2).max(40)
        .trim(),

    author: Joi.string().min(2).max(40)
        .trim(),

    year: Joi.number().integer().min(constants.CURRENT_YEAR - 2000).max(constants.CURRENT_YEAR),

    pages: Joi.number().integer().min(5).max(2000)
});

const paramsBookValidator = Joi.object({
    book_id: Joi.string().regex(constants.ID_REGEXP).required()
});

module.exports = { createBookValidator, updateBookValidator, paramsBookValidator };

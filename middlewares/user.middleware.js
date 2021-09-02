const { User } = require('../db');

const ErrorHandler = require('../errors/ErrorHandler');
const { createUserValidator, updateUserValidator, paramsUserValidator } = require('../validators/user.validator');

const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enam');

module.exports = {

    isEmailExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'User not found');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isDataUserValid: (req, res, next) => {
        try {
            const { error, value } = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyOnUpdateValid: (req, res, next) => {
        try {
            const { error, value } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isParamsIdValid: (req, res, next) => {
        try {
            const { error, value } = paramsUserValidator.validate(req.params);
            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.params = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value.trim() });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

};
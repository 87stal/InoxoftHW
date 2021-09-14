const { User } = require('../db');

const ErrorHandler = require('../errors/ErrorHandler');
const { createUserValidator, updateUserValidator, paramsUserValidator } = require('../validators/user.validator');

const { statusCodes } = require('../configs');

module.exports = {

    isEmailExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodes.CONFLICT, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isIdUserExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'User not found');
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
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
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
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(req.currentUser.role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, 'Forbidden');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isParamsIdValid: (req, res, next) => {
        try {
            const { error, value } = paramsUserValidator.validate(req.params);
            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
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
            if (value) {
                const user = await User.findOne({ [dbField]: value.trim() });

                req.user = user;
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    addBookToUser: (req, res, next) => {
        try {
            if (req.body.book) {
                const books = [
                    ...req.user.book,
                    ...req.body.book
                ];

                req.body = { ...req.body, book: books };
            }
            next();
        } catch (e) {
            next(e);
        }
    },

};

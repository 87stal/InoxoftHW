const { User } = require('../db');

const ErrorHandler = require('../errors/ErrorHandler');
const { createUserValidator, updateUserValidator } = require('../validators/user.validator');

const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enam');

module.exports = {

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

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

};

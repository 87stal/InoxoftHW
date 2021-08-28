const { User } = require('../db');

const ErrorHandler = require('../errors/ErrorHandler');
const validateEmail = require('../utils/validationEmail');
const validatePassword = require('../utils/validationPassword');

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
            // eslint-disable-next-line object-curly-newline
            const { email, password, name } = req.body;

            if (!validateEmail(email) || !email) {
                throw new ErrorHandler(BAD_REQUEST, 'Email invalid');
            }

            if (!validatePassword(password) || !password) {
                throw new ErrorHandler(BAD_REQUEST, 'Password invalid');
            }

            if (name.length < 3 || !name) {
                throw new ErrorHandler(BAD_REQUEST, 'Name too short');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyOnUpdateValid: (req, res, next) => {
        try {
            // eslint-disable-next-line object-curly-newline
            const { email, password, name } = req.body;

            if (name && name.length < 3) {
                throw new ErrorHandler(BAD_REQUEST, 'Name too short');
            }

            if (email && !validateEmail(email)) {
                throw new ErrorHandler(BAD_REQUEST, 'Email invalid');
            }

            if (password && !validatePassword(password)) {
                throw new ErrorHandler(BAD_REQUEST, 'Password invalid');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};

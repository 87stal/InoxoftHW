const { User } = require('../db');
const ErrorHandler = require('../errors/ErrorHandler');
const validateEmail = require('../utils/validationEmail');
const validatePassword = require('../utils/validationPassword');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enam');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

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

    isEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!validateEmail(email) || !email) {
                throw new ErrorHandler(BAD_REQUEST, 'Email invalid');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isPasswordValid: (req, res, next) => {
        try {
            const { password } = req.body;

            if (!validatePassword(password) || !password) {
                throw new ErrorHandler(BAD_REQUEST, 'Password invalid');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isNameValid: (req, res, next) => {
        try {
            const { name } = req.body;

            if (name.length < 3 || !name) {
                throw new ErrorHandler(BAD_REQUEST, 'Name too short');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isRoleValid: (req, res, next) => {
        try {
            const { role } = req.body;

            // eslint-disable-next-line no-constant-condition
            if (role && (role !== 'user' || 'admin')) {
                throw new ErrorHandler(BAD_REQUEST, 'Role invalid');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isBodyOnUpdateValid: async (req, res, next) => {
        try {
            const { body } = req;
            const userByEmail = await User.findOne({ email: body.email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }

            if (body.name && body.name.length < 3) {
                throw new ErrorHandler(BAD_REQUEST, 'Name too short');
            }

            if (body.email && !validateEmail(body.email)) {
                throw new ErrorHandler(BAD_REQUEST, 'Email invalid');
            }

            if (body.password && !validatePassword(body.password)) {
                throw new ErrorHandler(BAD_REQUEST, 'Password invalid');
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};

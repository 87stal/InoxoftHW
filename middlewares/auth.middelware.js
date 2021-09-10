const { jwtService } = require('../services');

const {
    constants,
    statusCodes,
} = require('../configs');
const { authValidator, usersValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const { ActionToken, OAuth } = require('../db');

module.exports = {

    isLoginBodyValid: (req, res, next) => {
        try {
            const { error, value } = authValidator.loginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Email or password invalid');
            }

            req.body = value;
        } catch (e) {
            next(e);
        }
    },

    checkTokenDynamic: (tokenName) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNA, 'No token');
            }

            if (tokenName === constants.REFRESH_TOKEN) {
                await jwtService.verifyToken(token, 'refresh');
            } else {
                await jwtService.verifyToken(token);
            }

            const tokenFromDB = await OAuth.findOne({ tokenName: token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNA, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyActionToken(actionType, token);

            const tokenFromDB = await ActionToken.findOne({ token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validatePassword: (req, res, next) => {
        try {
            const { error, value } = usersValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'Password invalid');
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};

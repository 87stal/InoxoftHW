const { jwtService } = require('../services');

const {
    constants,
    statusCodes,
    dataBaseTablesEnum
} = require('../configs');
const { authValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorHandler');
const { OAuth } = require('../db');

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

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNA, 'No token');
            }

            await jwtService.verifyToken(token);

            const tokenFromDB = await OAuth.findOne({ access_token: token }).populate(dataBaseTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNA, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNA, 'No token');
            }

            await jwtService.verifyToken(token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refresh_token: token }).populate(dataBaseTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNA, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

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

    checkTokenDynamic: (tokenName) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNA, 'No token');
            }

            if (tokenName === 'refresh_token') {
                await jwtService.verifyToken(token, 'refresh');
            } else {
                await jwtService.verifyToken(token);
            }

            const tokenFromDB = await OAuth.findOne({ tokenName: token }).populate(dataBaseTablesEnum.USER);

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

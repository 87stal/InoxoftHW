const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { actionTypesEnum, statusCodes, config } = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNA, 'Invalid token');
        }
    },

    generateToken: (tokenType) => {
        let secretWord;

        switch (tokenType) {
            case actionTypesEnum.FORGOT_PASS:
                secretWord = config.RESET_TOKEN_SECRET;
                break;
            case actionTypesEnum.SET_PASS:
                secretWord = config.SET_PASS_TOKEN_SECRET;
                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, 'Invalid token type');
        }

        const resetToken = jwt.sign({ tokenType }, secretWord, { expiresIn: '7d' });

        return resetToken;
    },

    verifyActionToken: (actionType, token) => {
        let word = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                word = config.FORGOT_PASS_TOKEN_SECRET;
                break;
            case actionTypesEnum.SET_PASS:
                word = config.SET_PASS_TOKEN_SECRET;
                break;
            default:
                throw new ErrorHandler(500, 'Wrong actionType');
        }

        return jwt.verify(token, word);
    }
};

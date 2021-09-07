const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, config } = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
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
    generateTokenReset: () => {
        const resetToken = jwt.sign({}, config.RESET_TOKEN_SECRET, { expiresIn: '10m' });

        return resetToken;
    }
};

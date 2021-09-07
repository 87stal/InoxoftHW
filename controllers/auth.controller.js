const { constants, statusCodes } = require('../configs');
const { OAuth } = require('../db');
const { passwordService, jwtService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            const currentUser = userUtil.userNormalizator(user);

            res.json({
                ...tokenPair,
                user: currentUser
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await OAuth.deleteOne({ access_token: token });

            res.status(statusCodes.NO_CONTENT).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { currentUser } = req;

            await OAuth.deleteOne({ refresh_token: token });

            const newTokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...newTokenPair, user: currentUser._id });

            res.json({
                ...newTokenPair,
                user: userUtil.userNormalizator(currentUser)
            });
        } catch (e) {
            next(e);
        }
    }
};

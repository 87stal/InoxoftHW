const { constants, statusCodes, actionTypesEnam } = require('../configs');
const { ActionToken, OAuth, User } = require('../db');
const { emailService, passwordService, jwtService } = require('../services');
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
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const actionToken = jwtService.generateActionToken(actionTypesEnam.FORGOT_PASS);

            await ActionToken.create({ token: actionToken, user: user._id });

            await emailService.sendMail(
                user.email, 'forgotPass', { name: user.name, tokenForgotPassword: actionToken }, 'Set new password'
            );

            res.json('Email was sent');
        } catch (e) {
            next(e);
        }
    },

    setUserPassword: async (req, res, next) => {
        try {
            const { currentUser, body } = req;

            const token = req.get(constants.AUTHORIZATION);

            const hashedPassword = await passwordService.hash(body.password);

            await User.findByIdAndUpdate(currentUser._id, { password: hashedPassword });
            await ActionToken.deleteOne({ token });
            await OAuth.deleteMany({ user: currentUser._id });

            res.json('ok');
        } catch (e) {
            next(e);
        }
    }

};

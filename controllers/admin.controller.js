const {
    actionTypesEnum, config, statusCodes, userRolesEnum,
} = require('../configs');
const { ActionToken, User } = require('../db');
const { emailService, passwordService, jwtService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    createAdmin: async (req, res, next) => {
        try {
            const { password } = req.body;

            const { currentUser } = req;

            const hashPassword = await passwordService.hash(password);

            const actionToken = jwtService.generateToken(actionTypesEnum.SET_PASS);

            const user = await User.create({ ...req.body, password: hashPassword, role: userRolesEnum.ADMIN });

            const tokenSetNewPassword = await ActionToken.create({ token: actionToken, user: user._id });

            const normalizedUser = userUtil.userNormalizator(user);

            await emailService.sendMail(
                user.email, 'emailNewAdmin',
                {
                    name: user.name,
                    creatorName: currentUser.name,
                    urlNewPassword: `${config.FRONTED_URL}/password/set?token=${tokenSetNewPassword}`
                },
                'Welcome to online library'
            );

            res.status(statusCodes.CREATED).json({
                data: {
                    normalizedUser
                }
            });
        } catch (e) {
            next(e);
        }
    }
};

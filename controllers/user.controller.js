const { User } = require('../db');
const { OK, CREATED } = require('../configs/statusCodes.enam');
const { emailService, passwordService } = require('../services');
const { userNormalizator } = require('../utils/user.util');

const getUserById = (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.user);

        res.status(OK).json({
            data: {
                normalizedUser
            }
        });
    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        const normalizedUsers = users.map((user) => userNormalizator(user));

        res.status(OK).json({
            data: {
                normalizedUsers
            }
        });
    } catch (e) {
        next(e);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { password } = req.body;

        const hashPassword = await passwordService.hash(password);
        const user = await User.create({ ...req.body, password: hashPassword });
        const normalizedUser = userNormalizator(user);

        await emailService.sendMail(user.email, 'emailWelcome', { name: user.name }, 'Welcome to online library');

        res.status(CREATED).json({
            data: {
                normalizedUser
            }
        });
    } catch (e) {
        next(e);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await User.findByIdAndRemove(user_id);

        const normalizedUser = userNormalizator(user);

        res.status(OK).json({
            data: {
                normalizedUser
            }
        });
    } catch (e) {
        next(e);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const user = await User.findByIdAndUpdate(user_id, req.body, { new: true, runValidators: true });

        const normalizedUser = userNormalizator(user);

        res.status(OK).json({
            data: {
                normalizedUser
            }
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line object-curly-newline
module.exports = { getUserById, getAllUsers, createUser, deleteUserById, updateUserById };

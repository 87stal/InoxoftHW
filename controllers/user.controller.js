const { User } = require('../db');
const { statusCodes } = require('../configs');
const { emailService, passwordService } = require('../services');
const { userUtil, fileUtil } = require('../utils');

const getUserById = (req, res, next) => {
    try {
        const normalizedUser = userUtil.userNormalizator(req.user);

        res.status(statusCodes.OK).json({
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

        const normalizedUsers = users.map((user) => userUtil.userNormalizator(user));

        res.status(statusCodes.OK).json({
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
        let user = await User.create({ ...req.body, password: hashPassword });

        if (req.files && req.files.avatar) {
            const { _id } = user;
            const uploadFile = await fileUtil.uploadImage(req.files.avatar, 'user', _id);

            user = await User.findByIdAndUpdate(_id, { avatar: uploadFile.Location }, { new: true });
        }

        const normalizedUser = userUtil.userNormalizator(user);

        await emailService.sendMail(user.email, 'emailWelcome', { name: user.name }, 'Welcome to online library');

        res.status(statusCodes.CREATED).json({
            normalizedUser
        });
    } catch (e) {
        next(e);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await User.findByIdAndRemove(user_id);

        const normalizedUser = userUtil.userNormalizator(user);

        res.status(statusCodes.OK).json({
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

        const normalizedUser = userUtil.userNormalizator(user);

        res.status(statusCodes.OK).json({
            data: {
                normalizedUser
            }
        });
    } catch (e) {
        next(e);
    }
};

const getBooksOfUser = (req, res, next) => {
    try {
        const { user } = req;
        const books = user.book;

        if (!books.length) {
            res.status(statusCodes.NO_CONTENT);
        }

        res.status(statusCodes.OK).json({
            data: {
                books
            }
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createUser,
    deleteUserById,
    getBooksOfUser,
    getUserById,
    getAllUsers,
    updateUserById
};

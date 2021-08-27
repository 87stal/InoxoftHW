const { User } = require('../db');
const { OK, CREATED } = require('../configs/statusCodes.enam');

const getUserById = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const user = await User.findById(user_id);

        res.status(OK).json({
            status: 'success',
            code: 200,
            data: {
                user
            }
        });
    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(OK).json({
            status: 'success',
            code: 200,
            data: {
                users
            }
        });
    } catch (e) {
        next(e);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(CREATED).json({
            status: 'created',
            code: 201,
            data: {
                user
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

        res.status(OK).json({
            status: 'success',
            code: 200,
            data: {
                user
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

        res.status(OK).json({
            status: 'success',
            code: 200,
            data: {
                user
            }
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line object-curly-newline
module.exports = { getUserById, getAllUsers, createUser, deleteUserById, updateUserById };

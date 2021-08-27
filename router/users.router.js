// eslint-disable-next-line object-curly-newline
const { getUserById, getAllUsers, createUser, deleteUserById, updateUserById } = require('../controllers/user.controller');
const {
    isEmailExist, isUserByIdExist, isEmailValid, isPasswordValid, isNameValid, isBodyOnUpdateValid, isRoleValid
} = require('../middlewares/user.middleware');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.get('/:user_id', getUserById);

router.get('/', getAllUsers);

router.post('/reg', isEmailValid, isPasswordValid, isNameValid, isRoleValid, isEmailExist, createUser);

router.delete('/:user_id', isUserByIdExist, deleteUserById);

router.patch('/:user_id', isUserByIdExist, isBodyOnUpdateValid, isRoleValid, updateUserById);

module.exports = router;

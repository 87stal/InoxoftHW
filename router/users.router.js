// eslint-disable-next-line object-curly-newline
const { getUserById, getAllUsers, createUser, deleteUserById, updateUserById } = require('../controllers/user.controller');
const {
    isEmailExist, isUserByIdExist, isDataUserValid, isBodyOnUpdateValid
} = require('../middlewares/user.middleware');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.get('/', getAllUsers);

router.post('/reg', isDataUserValid, isEmailExist, createUser);

router.get('/:user_id', getUserById);
router.delete('/:user_id', isUserByIdExist, deleteUserById);
router.patch('/:user_id', isBodyOnUpdateValid, isUserByIdExist, isEmailExist, updateUserById);

module.exports = router;

const router = require('express').Router();

const {
    getUserById, getAllUsers, createUser, deleteUserById, updateUserById
} = require('../controllers/user.controller');
const {
    isEmailExist, isUserByIdExist, isDataUserValid, isBodyOnUpdateValid, isParamsIdValid, getUserByDynamicParam
} = require('../middlewares/user.middleware');

router.use('/:user_id', isParamsIdValid);

router.get('/', getAllUsers);

router.post('/reg', isDataUserValid, getUserByDynamicParam('email', 'body'), isEmailExist, createUser);

router.get('/:user_id', getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist, getUserById);
router.delete('/:user_id', getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist, deleteUserById);
router.patch(
    '/:user_id', isBodyOnUpdateValid,
    getUserByDynamicParam('user_id', 'params', '_id'),
    isUserByIdExist, getUserByDynamicParam('email', 'body'), isEmailExist, updateUserById
);

module.exports = router;

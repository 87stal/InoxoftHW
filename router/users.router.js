const router = require('express').Router();

const {
    getUserById, getAllUsers, createUser, deleteUserById, updateUserById
} = require('../controllers/user.controller');
const {
    isEmailExist, isUserByIdExist, isDataUserValid, isBodyOnUpdateValid, isParamsIdValid
} = require('../middlewares/user.middleware');

router.get('/', getAllUsers);

router.post('/reg', isDataUserValid, isEmailExist, createUser);

router.get('/:user_id', isParamsIdValid, getUserById);
router.delete('/:user_id', isParamsIdValid, isUserByIdExist, deleteUserById);
router.patch('/:user_id', isParamsIdValid, isBodyOnUpdateValid, isUserByIdExist, isEmailExist, updateUserById);

module.exports = router;

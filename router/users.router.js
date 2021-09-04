const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewares, authMiddlewares } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/reg',
    userMiddlewares.isDataUserValid,
    userMiddlewares.getUserByDynamicParam('email', 'body'),
    userMiddlewares.isEmailExist,
    userController.createUser);

router.use('/:user_id', userMiddlewares.isParamsIdValid, authMiddlewares.checkAccessToken);

router.get('/:user_id',
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userController.getUserById);

router.delete(
    '/:user_id',
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userController.deleteUserById
);

router.patch(
    '/:user_id',
    userMiddlewares.isBodyOnUpdateValid,
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userMiddlewares.getUserByDynamicParam('email', 'body'),
    userMiddlewares.isEmailExist,
    authMiddlewares.checkAccessToken,
    userController.updateUserById
);

module.exports = router;

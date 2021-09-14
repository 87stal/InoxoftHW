const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewares, authMiddlewares, uploadFileMiddlewares } = require('../middlewares');

const { constants } = require('../configs');

router.get('/', userController.getAllUsers);

router.post('/reg',
    userMiddlewares.isDataUserValid,
    uploadFileMiddlewares.checkUserAvatar,
    userMiddlewares.getUserByDynamicParam('email', 'body'),
    userMiddlewares.isEmailExist,
    userController.createUser);

router.use('/:user_id', userMiddlewares.isParamsIdValid, authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN));

router.get('/:user_id',
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userController.getUserById);

router.get('/:user_id/books',
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userController.getBooksOfUser);

router.delete(
    '/:user_id',
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    userController.deleteUserById
);

router.patch(
    '/:user_id',
    userMiddlewares.isBodyOnUpdateValid,
    userMiddlewares.getUserByDynamicParam('email', 'body'),
    userMiddlewares.isEmailExist,
    userMiddlewares.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddlewares.isIdUserExist,
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    userController.updateUserById
);

module.exports = router;

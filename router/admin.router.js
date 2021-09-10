const router = require('express').Router();

const { adminController, authController } = require('../controllers');
const { authMiddlewares, userMiddlewares } = require('../middlewares');
const { actionTypesEnum, constants, userRolesEnum } = require('../configs');

router.post(
    '/reg',
    userMiddlewares.isDataUserValid,
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    userMiddlewares.checkUserRole([userRolesEnum.ADMIN]),
    userMiddlewares.getUserByDynamicParam('email', 'body'),
    userMiddlewares.isEmailExist,
    adminController.createAdmin
);

router.post(
    '/password/set',
    authMiddlewares.validatePassword,
    authMiddlewares.checkActionToken(actionTypesEnum.SET_PASS),
    authController.setUserPassword
);

module.exports = router;

const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewares, userMiddlewares } = require('../middlewares');
const { constants } = require('../configs');

router.post(
    '/login',
    // authMiddlewares.isLoginBodyValid,
    userMiddlewares.getUserByDynamicParam('email'),
    userMiddlewares.isIdUserExist,
    authController.login
);

router.post('/logout', authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN), authController.logout);
router.post('/reset');
router.post('/refresh', authMiddlewares.checkTokenDynamic(constants.REFRESH_TOKEN), authController.refreshToken);

module.exports = router;

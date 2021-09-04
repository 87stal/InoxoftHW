const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewares, userMiddlewares } = require('../middlewares');

router.post(
    '/login',
    // authMiddlewares.isLoginBodyValid,
    userMiddlewares.getUserByDynamicParam('email'),
    userMiddlewares.isIdUserExist,
    authController.login
);

router.post('/logout', authMiddlewares.checkAccessToken, authController.logout);

router.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

module.exports = router;

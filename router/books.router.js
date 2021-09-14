const router = require('express').Router();

const {
    getBookById, getAllBooks, createBook, deleteBookById, updateBookById
} = require('../controllers/book.controller');

const { authMiddlewares, bookMiddlewares, userMiddlewares } = require('../middlewares');

const { constants, userRolesEnum } = require('../configs');

router.get('/', getAllBooks);
router.post('/',
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    userMiddlewares.checkUserRole([userRolesEnum.ADMIN]),
    bookMiddlewares.isDataBookValid,
    bookMiddlewares.getBookByDynamicParam('author'),
    bookMiddlewares.isBookbyNameExist,
    createBook);

router.use('/:book_id', bookMiddlewares.isParamsIdValid);

router.get('/:book_id',
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    getBookById);

router.delete('/:book_id',
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    deleteBookById);

router.patch('/:book_id',
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    bookMiddlewares.isBodyOnUpdateValid,
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookbyNameExist,
    userMiddlewares.addBookToUser,
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    updateBookById);

module.exports = router;

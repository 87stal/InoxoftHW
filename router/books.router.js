const router = require('express').Router();

const {
    getBookById, getAllBooks, createBook, deleteBookById, updateBookById
} = require('../controllers/book.controller');

const { authMiddlewares, bookMiddlewares } = require('../middlewares');

const { constants } = require('../configs');

router.get('/', getAllBooks);
router.post('/',
    bookMiddlewares.isDataBookValid,
    bookMiddlewares.getBookByDynamicParam('author'),
    bookMiddlewares.isBookbyNameExist,
    createBook);

router.use('/:book_id', bookMiddlewares.isParamsIdValid);

router.get('/:book_id',
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookByIdExist,
    getBookById);

router.delete('/:book_id',
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookByIdExist,
    deleteBookById);

router.patch('/:book_id',
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    bookMiddlewares.isBodyOnUpdateValid,
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookByIdExist,
    bookMiddlewares.isBookbyNameExist,
    authMiddlewares.checkTokenDynamic(constants.ACCESS_TOKEN),
    updateBookById);

module.exports = router;

const router = require('express').Router();

const {
    getBookById, getAllBooks, createBook, deleteBookById, updateBookById
} = require('../controllers/book.controller');

const { authMiddlewares, bookMiddlewares } = require('../middlewares');

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
    authMiddlewares.checkAccessToken,
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookByIdExist,
    deleteBookById);

router.patch('/:book_id',
    authMiddlewares.checkAccessToken,
    bookMiddlewares.isBodyOnUpdateValid,
    bookMiddlewares.getBookByDynamicParam('book_id', 'params', '_id'),
    bookMiddlewares.isBookByIdExist,
    bookMiddlewares.isBookbyNameExist,
    authMiddlewares.checkAccessToken,
    updateBookById);

module.exports = router;

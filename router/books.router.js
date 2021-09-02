const router = require('express').Router();

const {
    getBookById, getAllBooks, createBook, deleteBookById, updateBookById
} = require('../controllers/book.controller');

const {
    getBookByDynamicParam, isBookbyNameExist, isBookByIdExist, isDataBookValid, isBodyOnUpdateValid, isParamsIdValid
} = require('../middlewares/book.middleware');

router.use('/:book_id', isParamsIdValid);

router.get('/', getAllBooks);
router.post('/', isDataBookValid, getBookByDynamicParam('author'), isBookbyNameExist, createBook);

router.get('/:book_id', getBookByDynamicParam('book_id', 'params', '_id'), isBookByIdExist, getBookById);
router.delete('/:book_id', getBookByDynamicParam('book_id', 'params', '_id'), isBookByIdExist, deleteBookById);
router.patch('/:book_id',
    isBodyOnUpdateValid,
    getBookByDynamicParam('book_id', 'params', '_id'),
    isBookByIdExist,
    isBookbyNameExist,
    updateBookById);

module.exports = router;

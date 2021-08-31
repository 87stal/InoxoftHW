const router = require('express').Router();

const {
    getBookById, getAllBooks, createBook, deleteBookById, updateBookById
} = require('../controllers/book.controller');

const {
    isBookExist, isBookByIdExist, isDataBookValid, isBodyOnUpdateValid, isParamsIdValid
} = require('../middlewares/book.middleware');

router.get('/', getAllBooks);
router.post('/', isDataBookValid, isBookExist, createBook);

router.post('/:book_id', isParamsIdValid, isBookByIdExist, updateBookById);
router.get('/:book_id', isParamsIdValid, isBookByIdExist, getBookById);
router.delete('/:book_id', isParamsIdValid, isBookByIdExist, deleteBookById);
router.patch('/:book_id', isParamsIdValid, isBodyOnUpdateValid, isBookByIdExist, isBookExist, updateBookById);

module.exports = router;

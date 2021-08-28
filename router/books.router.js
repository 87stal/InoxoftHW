// eslint-disable-next-line object-curly-newline
const { getBookById, getAllBooks, createBook, deleteBookById, updateBookById } = require('../controllers/book.controller');
// eslint-disable-next-line object-curly-newline
const { isBookExist, isBookByIdExist, isDataBookValid, isBodyOnUpdateValid } = require('../middlewares/book.middleware');

// eslint-disable-next-line import/order
const router = require('express').Router();

router.get('/', getAllBooks);
router.post('/', isDataBookValid, isBookExist, createBook);

router.post('/:book_id', isBookByIdExist, updateBookById);
router.get('/:book_id', isBookByIdExist, getBookById);
router.delete('/:book_id', isBookByIdExist, deleteBookById);
router.patch('/:book_id', isBodyOnUpdateValid, isBookByIdExist, isBookExist, updateBookById);

module.exports = router;

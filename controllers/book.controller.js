const { Book } = require('../db');
const { OK, CREATED } = require('../configs/statusCodes.enam');

const getBookById = async (req, res, next) => {
    try {
        const { book_id } = req.params;

        const book = await Book.findById(book_id);

        res.status(OK).json({
            data: {
                book
            }
        });
    } catch (e) {
        next(e);
    }
};

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();

        res.status(OK).json({
            data: {
                books
            }
        });
    } catch (e) {
        next(e);
    }
};

const createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(CREATED).json({
            data: {
                book
            }
        });
    } catch (e) {
        next(e);
    }
};

const deleteBookById = async (req, res, next) => {
    try {
        const { book_id } = req.params;
        const book = await Book.findByIdAndRemove(book_id);

        res.status(OK).json({
            data: {
                book
            }
        });
    } catch (e) {
        next(e);
    }
};

const updateBookById = async (req, res, next) => {
    try {
        const { book_id } = req.params;
        const book = await Book.findByIdAndUpdate(book_id, req.body, { new: true, runValidators: true });

        res.status(OK).json({
            data: {
                book
            }
        });
    } catch (e) {
        next(e);
    }
};

// eslint-disable-next-line object-curly-newline
module.exports = { getBookById, getAllBooks, createBook, deleteBookById, updateBookById };

const { Book } = require('../db');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enam');
const { createBookValidator, updateBookValidator } = require('../validators/book.validator');

module.exports = {

    isBookExist: async (req, res, next) => {
        try {
            const { name, author } = req.body;

            let bookByName;

            if (name && author) {
                bookByName = await Book.findOne({ name: name.trim(), author: author.trim() });
            }

            if (bookByName) {
                throw new ErrorHandler(CONFLICT, 'Book is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBookByIdExist: async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const book = await Book.findById(book_id);

            if (!book) {
                throw new ErrorHandler(NOT_FOUND, 'Book not found');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isDataBookValid: (req, res, next) => {
        try {
            const { error, value } = createBookValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyOnUpdateValid: (req, res, next) => {
        try {
            const { error, value } = updateBookValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
            next();
        } catch (e) {
            next(e);
        }
    }
};

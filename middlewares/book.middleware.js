const { Book } = require('../db');
const ErrorHandler = require('../errors/ErrorHandler');
const currentYear = require('../utils/currentYear');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enam');

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
            // eslint-disable-next-line object-curly-newline
            const { name, author, year, pages } = req.body;

            if (!name) {
                throw new ErrorHandler(BAD_REQUEST, 'Name of the book is requared');
            }

            if (!author || author.length < 3) {
                throw new ErrorHandler(BAD_REQUEST, 'The name of author is invalid');
            }

            if (!year || year.length < 3 || +year > currentYear) {
                throw new ErrorHandler(BAD_REQUEST, 'The year cannot be more than datу of today and less than 1000');
            }

            if (!pages || pages.length > 4) {
                throw new ErrorHandler(BAD_REQUEST, 'Pages cannot be more than 4 digit');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyOnUpdateValid: (req, res, next) => {
        try {
            // eslint-disable-next-line object-curly-newline
            const { name, author, year, pages } = req.body;

            if (name && name.length < 3) {
                throw new ErrorHandler(BAD_REQUEST, 'Name too short');
            }

            if (author && author.length < 3) {
                throw new ErrorHandler(BAD_REQUEST, 'Author name invalid');
            }

            if (year && (year.length < 4 || +year > currentYear)) {
                throw new ErrorHandler(BAD_REQUEST, 'The year cannot be more than datу of today and less than 1000');
            }

            if (pages && pages.length > 4) {
                throw new ErrorHandler(BAD_REQUEST, 'Pages cannot be more than 4 digit');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

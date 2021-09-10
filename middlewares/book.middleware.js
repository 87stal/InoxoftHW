const { Book } = require('../db');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enum');
const { createBookValidator, updateBookValidator, paramsBookValidator } = require('../validators/book.validator');

module.exports = {

    isBookbyNameExist: (req, res, next) => {
        try {
            const { books } = req;
            const { name } = req.body;
            let existingBook;

            if (books.length && name) {
                existingBook = books.find((book) => book.name === name);
            }

            if (existingBook) {
                throw new ErrorHandler(CONFLICT, 'Book is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBookByIdExist: (req, res, next) => {
        try {
            const { books } = req;

            if (!books.length) {
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
                throw new ErrorHandler(BAD_REQUEST, 'Data of book invalid');
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
                throw new ErrorHandler(BAD_REQUEST, 'Data of book invalid');
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isParamsIdValid: (req, res, next) => {
        try {
            const { error, value } = paramsBookValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, 'No book');
            }

            req.params = value;
            next();
        } catch (error) {

        }
    },

    getBookByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const books = await Book.find({ [dbField]: value.trim() });

            req.books = books;

            next();
        } catch (e) {
            next(e);
        }
    }
};

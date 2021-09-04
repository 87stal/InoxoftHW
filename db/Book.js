const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum } = require('../configs');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
    },
    pages: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.BOOK, bookSchema);

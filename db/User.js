const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum } = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    [dataBaseTablesEnum.BOOK]: {
        type: Array,
        ref: dataBaseTablesEnum.BOOK
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USER, userSchema);

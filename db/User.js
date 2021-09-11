const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum, userRolesEnum } = require('../configs');

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
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    [dataBaseTablesEnum.BOOK]: {
        type: Array,
        ref: dataBaseTablesEnum.BOOK
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model(dataBaseTablesEnum.USER, userSchema);

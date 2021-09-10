const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [dataBaseTablesEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTablesEnum.USER
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(dataBaseTablesEnum.USER);
});

module.exports = model(dataBaseTablesEnum.OAUTH, OAuthSchema);

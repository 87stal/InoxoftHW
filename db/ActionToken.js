const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../configs');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    [dataBaseTablesEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dataBaseTablesEnum.USER
    },
}, { timestamps: true });

ActionTokenSchema.pre('findOne', function() {
    this.populate(dataBaseTablesEnum.USER);
});

module.exports = model(dataBaseTablesEnum.ACTION_TOKEN, ActionTokenSchema);

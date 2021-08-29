const bcrypt = require('bcrypt');

const { BAD_REQUEST } = require('../configs/index');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, 'Email or password is wrong');
        }
    }
};

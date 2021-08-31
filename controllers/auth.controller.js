const { listUsers, addUser } = require('../utils/users');
const { CONFLICT, CREATED, BAD_REQUEST } = require('../configs/statusCodes.enam');
const validateEmail = require('../utils/validationEmail');

const login = async (req, res) => {
    const { email, password } = req.body;
    const users = await listUsers();

    // eslint-disable-next-line no-shadow
    const user = JSON.parse(users).find((user) => user.email === email);

    if (!user.length) {
        res.redirect('/auth/reg');
        return;
    }

    if (password !== user[0].password) {
        res.status(BAD_REQUEST).json({
            status: 'error',
            code: BAD_REQUEST,
            data: 'Bad request',
            message: 'Wrong password'
        });
    }
};

const createUser = async (req, res) => {
    const {
        email, password, name, age
    } = req.body;

    const users = await listUsers();

    const existingUser = JSON.parse(users).filter((user) => user.email === email);

    if (!existingUser.length) {
        res.status(CONFLICT).render('error', { message: 'This email alredy registered' });
        return;
    }

    if (validateEmail(email) && password) {
        addUser(email, name, password, age);
        res.status(CREATED).redirect('/auth/log');
        return;
    }
    res.render('error', { message: 'This email is invalid or not all required fields are filled in' });
};

module.exports = {
    login, createUser
};

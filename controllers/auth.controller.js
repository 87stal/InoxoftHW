const { listUsers, addUser } = require('../utils/users');
const { CONFLICT, CREATED, BAD_REQUEST } = require('../configs/statusCodes.enam');
const validateEmail = require('../utils/validation');

const getLogForm = async (req, res) => {
    res.render('login');
};

const login = async (req,  res) => {
  
    const { email, password } = req.body;
    const users = await listUsers();

    const user = JSON.parse(users).filter(user =>
        user.email == email);


    if (user.length == 0) {
        res.redirect('/auth/reg');
        return;
    };

    if (password !== user[0].password) {
        res.status(BAD_REQUEST).render('error', { message: 'Wrong password' });
        return;
    };

    res.render('welcome', { user });
};

const getRegForm = async (req, res) => {
    res.render('reg');
};

const createUser = async (req, res) => {
   
    const { email, password, name, age } = req.body;

    const users = await listUsers();
 

    const existingUser = JSON.parse(users).filter(user =>
        user.email == email);

    if (existingUser.length !== 0) {

        res.status(CONFLICT).render('error', { message: 'This email alredy registered' });
        return;
    };

    if (validateEmail(email) && password) {

        addUser(email, name, password, age);
        res.status(CREATED).redirect('/auth/log');
        return;

    } 
        res.render('error', { message: 'This email is invalid or not all required fields are filled in' });

}

module.exports = { getLogForm, login, createUser, getRegForm }
const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs').promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const { BAD_REQUEST, CONFLICT, NOT_FOUND, OK, CREATED } = require('./configs/statusCodes.enam');
const { PORT } = require('./configs/config');
const validateEmail = require('./utils/validation');
const  listUsers  = require('./utils/users')

const staticPath = path.join(__dirname, 'static');
const usersPath = path.join(__dirname, '/db/users.json');
let users;
let user = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

//Work with database
async function listUsers() {
  try {
    const allUsers = await fs.readFile(usersPath, "utf8");
    users = allUsers;
  } catch (err) {
    throw err;
  }
}

async function addUser(userEmail, userName, userPassword, userAge) {
  try {
    const allUsers = await fs.readFile(usersPath, "utf8");

    user.push({
      id: uuidv4(),
      name: userName,
      email: userEmail,
      age: userAge,
      password: userPassword
    });

    const newUsers = [
      ...JSON.parse(allUsers),
      ...user
    ];
    fs.writeFile(usersPath, JSON.stringify(newUsers), "utf8");

  } catch (err) {
    throw err;
  }
}

listUsers()

//render endpoints 
app.get('/reg', (req, res) => {
  res.render('reg');
});

app.get('/auth', (req, res) => {
  res.render('login');
});

app.get('/users', (req, res) => {
  res.render('users', { users: JSON.parse(users)});
});


app.get('/users/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = req.query;
  user = JSON.parse(users).filter(user =>
    user.id == user_id);

  res.status(OK).render('user', { user: user })
});


//Post req
app.post('/auth', (req, res) => {

  const { email, password } = req.body;

  user = JSON.parse(users).filter(user =>
    user.email == email);

  if (user.length == 0) {
    res.redirect('/reg');
    return;
  }

  if (password !== user[0].password) {

    res.status(BAD_REQUEST).render('error', { message: 'Wrong password' });
    return;
  }

  res.render('welcome', { user: user });
});


app.post('/reg', (req, res) => {

  const { email, password, name, age } = req.body;
  const existingUser = JSON.parse(users).filter(user =>
    user.email == email);

  if (existingUser.length !== 0) {
    res.status(CONFLICT).render('error', { message: 'This email alredy registered' });
    return;
  }

  if (validateEmail(email) && password) {
    addUser(email, name, password, age);
  
    res.status(CREATED).redirect('/auth');
  } else {
    res.render('error', {message: 'This email is invalid or not all required fields are filled in'});
  }

});


app.listen(PORT, () => {
  console.log('Example app listening on port 3000!')
})

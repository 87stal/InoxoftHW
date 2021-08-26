const express = require('express');
const expressHbs = require('express-handlebars');
const path = require("path");



// const { BAD_REQUEST, CONFLICT, OK, CREATED } = require('./configs/statusCodes.enam');
const { PORT } = require('./configs/config');


const staticPath = path.join(__dirname, 'static');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const { authRouter, usersRouter } = require('./router/index');


app.use('/users', usersRouter);
app.use('/auth', authRouter);




app.listen(PORT, () => {
  console.log('Example app listening on port 5000!')
})

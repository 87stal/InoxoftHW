const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./configs/config');

mongoose.connect('mongodb://localhost:27017/InoxoftHW');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { usersRouter, booksRouter } = require('./router/index');

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Example app listening on port 5000!');
});

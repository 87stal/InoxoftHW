const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DB_CONNECT_URL } = require('./configs/config');

mongoose.connect(DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    usersRouter, booksRouter, authRouter, adminRouter
} = require('./router');

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log('Example app listening on port 5000!');
});

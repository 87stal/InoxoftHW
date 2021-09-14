const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const { statusCodes, config } = require('./configs');
const cronJobs = require('./cron');

mongoose.connect(config.URI_DB);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(cors({ origin: _configureCors }));

app.use(helmet());
app.use(cors());
app.use(morgan(formatsLogger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    handler: (req, res) => res.status(statusCodes.BAD_REQUEST).json({
        status: 'error',
        code: statusCodes.BAD_REQUEST,
        data: 'Bad request',
        message: 'Too many requests, please try again later.'
    })
});

const {
    usersRouter, booksRouter, authRouter, adminRouter
} = require('./router');

app.use('/', apiLimiter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(config.PORT, () => {
    console.log('Example app listening on port 5000!');
    cronJobs();
});

function _configureCors(origin, callback) {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const ErrorHandler = require('../errors/ErrorHandler');

const { config, statusCodes } = require('../configs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_DEFAULT,
        pass: config.EMAIL_DEFAULT_PASSW
    }
});

const options = {
    viewEngine: {
        extname: '.hbs',
        partialsDir: './email_templates/partials',
        layoutsDir: './email_templates/layouts'
    },
    viewPath: 'email_templates',
    extName: '.hbs'
};

transporter.use('compile', hbs(options));

const sendMail = (userMail, template, context = {}, subject) => {
    if (!template) {
        throw new ErrorHandler(statusCodes.SERVER_ERROR, 'Wrong template name');
    }

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        template,
        context
    });
};

module.exports = {
    sendMail
};

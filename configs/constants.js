module.exports = {
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    // eslint-disable-next-line no-useless-escape
    PASSWORD_REGEXP: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),
    CURRENT_YEAR: new Date().getFullYear(),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$')
};

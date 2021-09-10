module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/InoxoftHW',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET || 'reset',
    SET_PASS_TOKEN_SECRET: process.env.SET_PASS_TOKEN_SECRET || 'set_new',

    EMAIL_DEFAULT: process.env.EMAIL_DEFAULT || 'test@gmail.com',
    EMAIL_DEFAULT_PASSW: process.env.EMAIL_DEFAULT_PASSW || 'test@gmail.com',
    FRONTED_URL: process.env.FRONTED_URL || 'https://inoxoft.com'
};

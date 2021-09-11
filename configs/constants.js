module.exports = {
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),

    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    ID_REGEXP: new RegExp('^[0-9a-fA-F]{24}$'),
    PASSWORD_REGEXP: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),

    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',

    MAX_AVATAR_SIZE: 5 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg'
    ]
};

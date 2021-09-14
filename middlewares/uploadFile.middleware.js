const ErrorHandler = require('../errors/ErrorHandler');
const { constants: { MAX_AVATAR_SIZE, PHOTOS_MIMETYPES } } = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files && !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(400, `Wrong file format ${name}`);
            }

            if (size > MAX_AVATAR_SIZE) {
                throw new ErrorHandler(400, `File ${name} is too big`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

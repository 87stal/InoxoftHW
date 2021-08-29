const userNormalizator = (userToNormalize) => {
    const filedToRemove = [
        'password',
        '__v'
    ];

    // eslint-disable-next-line no-param-reassign
    userToNormalize = userToNormalize.toJSON();

    filedToRemove.forEach((filed) => {
        // eslint-disable-next-line no-param-reassign
        delete userToNormalize[filed];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};

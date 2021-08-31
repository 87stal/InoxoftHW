const userNormalizator = (userToNormalize) => {
    const filedToRemove = [
        'password',
        '__v'
    ];

    userToNormalize = userToNormalize.toJSON();

    filedToRemove.forEach((filed) => {
        delete userToNormalize[filed];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};

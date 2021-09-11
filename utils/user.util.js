const userNormalizator = (userToNormalize) => {
    const filedToRemove = [
        'password',
        '__v'
    ];

    userToNormalize = userToNormalize.toObject();

    filedToRemove.forEach((field) => {
        delete userToNormalize[field];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};

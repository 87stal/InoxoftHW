module.exports = function validatePassword(password) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return regex.test(String(password));
};

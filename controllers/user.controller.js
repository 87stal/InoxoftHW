const { listUsers } = require('../utils/users');
const { OK } = require('../configs/statusCodes.enam');


const getUserById = async (req, res) => {

    const { user_id } = req.params;
    const users = await listUsers();

    const user = JSON.parse(users).find(user =>
        user.id == user_id);

    res.status(OK).render('user', { user })
};

const getAllUsers = async (req, res) => {
    const users = await listUsers();

    res.render('users', { users: JSON.parse(users) });
};



module.exports = { getUserById, getAllUsers }
const path = require("path");
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');


const usersPath = path.join('./db', '/users.json');
console.log(usersPath)
let users;
let user = [];


module.exports = async function listUsers() {
    try {
        const allUsers = await fs.readFile(usersPath, "utf8");
        users = allUsers;
    } catch (err) {
        throw err;
    }
}

module.exports = async function addUser(userEmail, userName, userPassword, userAge) {
    try {
        const allUsers = await fs.readFile(usersPath, "utf8");
        user.push({
            id: uuidv4(),
            name: userName,
            email: userEmail,
            age: userAge,
            password: userPassword
        });
        const newUsers = [
            ...JSON.parse(allUsers),
            ...user
        ];
        fs.writeFile(usersPath, JSON.stringify(newUsers), "utf8");

    } catch (err) {
        throw err;
    }
}


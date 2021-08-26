const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const usersPath = path.join(__dirname, '../db/users.json');


async function listUsers() {
    
    const allUsers = await fs.readFile(usersPath, "utf8");
    return allUsers;
}

async function addUser(userEmail, userName, userPassword, userAge) {
  
    const allUsers = await fs.readFile(usersPath, "utf8");
    const user = [];

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
}
module.exports = { listUsers, addUser };
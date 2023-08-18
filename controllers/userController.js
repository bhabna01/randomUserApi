const userModel = require('../models/userModel');

function getRandomUser() {
    const users = userModel.readDataFile();
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
}

function getAllUsers(limit) {
    const users = userModel.readDataFile();
    return users.slice(0, limit);
}

function saveUser(newUser) {
    const users = userModel.readDataFile();
    users.push(newUser);
    userModel.writeDataFile(users);
    return newUser;
}

function updateUser(userId, updatedUserData) {
    const users = userModel.readDataFile();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return null; // User not found
    }

    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    userModel.writeDataFile(users);
    return users[userIndex];
}

function deleteUser(userId) {
    const users = userModel.readDataFile();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return null; // User not found
    }

    const deletedUser = users.splice(userIndex, 1);
    userModel.writeDataFile(users);
    return deletedUser[0];
}

module.exports = {
    getRandomUser,
    getAllUsers,
    saveUser,
    updateUser,
    deleteUser,
};

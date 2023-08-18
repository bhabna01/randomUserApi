const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/random', (req, res) => {
    const randomUser = userController.getRandomUser();
    res.json(randomUser);
});

router.get('/all', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const allUsers = userController.getAllUsers(limit);
    res.json(allUsers);
});

router.post('/save', (req, res) => {
    const newUser = req.body;


    if (!newUser.id || !newUser.gender || !newUser.name || !newUser.contact || !newUser.address || !newUser.photoUrl) {
        return res.status(400).json({ error: 'Missing required properties' });
    }

    const savedUser = userController.saveUser(newUser);
    res.status(201).json(savedUser);
});

router.patch('/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = userController.updateUser(userId, updatedUserData);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
});
router.patch('/bulk-update', (req, res) => {
    const userIdsToUpdate = req.body;


    if (!Array.isArray(userIdsToUpdate) || userIdsToUpdate.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty user IDs array' });
    }

    const updatedUsers = [];

    for (let i = 0; i < userIdsToUpdate.length; i += 2) {
        const userId = userIdsToUpdate[i];
        const updatedUserData = userIdsToUpdate[i + 1];


        const updatedUser = userController.updateUser(userId, updatedUserData);

        if (updatedUser) {
            updatedUsers.push(updatedUser);
        }
    }

    res.json(updatedUsers);
});



router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;

    const deletedUser = userController.deleteUser(userId);

    if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);
});

module.exports = router;

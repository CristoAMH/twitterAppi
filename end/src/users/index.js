const express = require('express');
const router = express.Router();
const controller = require('./users.controller')






router.get('/', controller.getAllUsers);
router.get('/:username',controller.getUserByID)
router.post('/', controller.createUser);
router.delete('/:username', controller.removeUserById)
router.patch('/:username', controller.changeUserData)

module.exports = router;


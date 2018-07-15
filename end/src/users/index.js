const express = require('express');
const router = express.Router();
const controller = require('./users.controller')


router.get('/', controller.getAllUsers);
router.get('/:username', controller.getUserByUsername);
router.post('/', controller.createUser);
router.delete('/:id', controller.removeUserById);
router.patch('/:id', controller.changeUserData);

module.exports = router;


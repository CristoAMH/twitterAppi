const express = require('express');
const router = express.Router();
const controller = require('./tweets.controller');
const fs = require('fs');

USERS = JSON.parse(fs.readFileSync('./end/src/users/users.json'));

router.get('/', controller.getAllTweets)
router.get('/:id', controller.getTweetByID)
router.post('/', controller.createTweet)

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./tweets.controller');

router.get('/', controller.getAllTweets)
router.get('/:id', controller.getTweetByID)
router.post('/', controller.createTweet)
router.delete('/:id', controller.deleteTweetById)

module.exports = router;

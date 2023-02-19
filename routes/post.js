const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controller');


//need to map a route to this post controller that is route to post action(function) which is inside controller
router.get('/post', postController.post);
module.exports = router;
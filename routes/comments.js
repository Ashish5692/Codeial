const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//Accesing all action posted in comments_controller
// router.post('/create', commentsController.create)

router.post('/create',passport.checkAuthentication, commentsController.create); //check authentication is function we have created   


//need to map a route to this post controller that is route to post action(function) which is inside controller

module.exports = router;
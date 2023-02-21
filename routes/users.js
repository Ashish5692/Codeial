const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

//need to map a route to this users controller that is route to profile action(function) which is inside controller
router.get('/profile', usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//matching the routes =method in form is post
router.post('/create',usersController.create);

module.exports = router;
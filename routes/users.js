const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

//need to map a route to this users controller that is route to profile action(function) which is inside controller
router.get('/profile', usersController.profile);

module.exports = router;
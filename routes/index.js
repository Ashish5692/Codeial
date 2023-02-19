const express = require('express'); //everytime i do require express it will not create new instance of express it will just fetch the existing instance
//express is created and required only once

const homeController = require('../controllers/home_controller');

const router = express.Router();


console.log('router loaded');

router.get('/',homeController.home);

//we need to export it to be available for index.js
//we read that export and mosule.export do the same thing but here it is not doing same thing
module.exports = router;
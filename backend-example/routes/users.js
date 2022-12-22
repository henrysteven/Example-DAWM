var express = require('express');
var router = express.Router();
var user_controllers = require('../controllers/user.controlles.js')
/* GET users listing. */

router.get('/all', user_controllers.get_all);

module.exports = router;

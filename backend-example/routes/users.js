var express = require('express');
var user_router = express.Router();
var user_controllers = require('../controllers/user.controlles.js')
/* GET users listing. */

user_router.get('/all', user_controllers.get_all);
user_router.post('/', user_controllers.create);
user_router.get('/:user_id', user_controllers.get_by_id);

module.exports = user_router;

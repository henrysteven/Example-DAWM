var express = require('express');
const { verify } = require('jsonwebtoken');
var user_router = express.Router();
var user_controllers = require('../controllers/user.controlles.js')
var validate_token = require('../middleware/validate_token');
/* GET users listing. */


user_router.get('/all', validate_token.verify_token, user_controllers.get_all);
user_router.post('/login', user_controllers.login);




user_router.post('/', validate_token.verify_token, user_controllers.create);
user_router.get('/:user_id' , validate_token.verify_token, user_controllers.get_by_id);

module.exports = user_router;

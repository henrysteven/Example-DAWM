var express = require('express');
var product_router = express.Router();
var product_controllers = require('../controllers/product.controllers.js')
/* GET users listing. */

product_router.post('/', product_controllers.create);
product_router.post('/create_all', product_controllers.create_all);
//product_router.get(/\/a[b|d]c/, product_controllers.get_search);
product_router.get('/all', product_controllers.get_all);
product_router.get('/search/:name', product_controllers.get_search);
product_router.delete('/:id',product_controllers.delete_product);
module.exports = product_router;
'use strict';
const { USER } = require('../models/index');

exports.get_all = function (req, res, next) {
  return USER.findAll({}).then((result) => {
    res.status(200).send(result)

  }).catch((err) => {

  });
}
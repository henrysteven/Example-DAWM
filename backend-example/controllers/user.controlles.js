const { USER } = require("../models/index");
var inspector = require("schema-inspector");
const Joi = require("joi");
const { user_schema } = require("../schema/user.schema");
const generate_token = require('../middleware/generate_token').generate_token;

exports.get_all = function (req, res, next) {
    return USER.findAll({})
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.create = function (req, res, next) {
    var result = inspector.validate(user_schema, req.body);
    if (!result.valid) {
        return res.send(result.format());
    }
    const user = USER.create(req.body)
        .then((data) => {
            return res.status(200).send({ user_id: data.user_id });
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
};


exports.get_by_id = async function (req, res, next) {
    //console.log(req.params)
    const schema = Joi.object({
        user_id: Joi.number().greater(0).required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return res.status(500).send(error)
    }
    await USER.findOne({ where: value }).then((user) => {
        return res.status(200).send(user);

    }).catch((e) => {
        return res.status(500).send({ error: e });
    });
}

exports.login = async (req, res, next) => {
    const schema = Joi.object({
        user: Joi.string(),
        pass: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(500).send(error)
    }
    let user = await USER.findOne({ where: { username: value.user, pass: value.pass } });
    if (!user) return res.status(500).send(error);
    let token = generate_token({
        username: user.username,
        user_id: user.user_id
    });
    console.log(token);
    return res.send({ 'token': token });
}
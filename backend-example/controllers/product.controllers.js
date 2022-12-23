const { PRODUCT } = require('../models/index');
const Joi = require('joi');
const { Op } = require("sequelize");
exports.create = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        value: Joi.number(),
        user_id: Joi.number()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(500).send(error)
    }
    const user = PRODUCT.create(value)
        .then((data) => {
            return res.status(200).send({ product_id: data.id });
        })
        .catch((e) => {
            return res.status(500).send({ error: e });
        });
}

exports.create_all = async (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        value: Joi.number(),
        user_id: Joi.number()
    });
    const array_schema = Joi.array().items(schema);
    const { error, value } = array_schema.validate(req.body);
    if (error) {
        return res.status(500).send(error)
    }
    var size = 0;
    for (product of value) {
        await PRODUCT.create(product)
            .then((data) => {
                size++;
            })
    };
    var response = size == value.length ? { 'count create': size } : { 'error': 'no create all' };
    return res.status(200).send(response);
}


exports.get_search = async (req, res, next) => {
    console.log(req.params)
    const schema = Joi.object({
        name: Joi.string(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return res.status(500).send(error)
    }
    await PRODUCT.findAll({
        where: {
            name: {
                [Op.like]: `%${value.name}%`,
            }
        }
    }).then((elements) => {
        return res.status(200).send(elements);
    }).catch((e) => {
        console.log(e)
        return res.status(500).send({ error: e });
    })
}
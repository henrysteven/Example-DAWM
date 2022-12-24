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


    // update si existe si no guardar

    const schema = Joi.object({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        value: Joi.number(),
        user_id: Joi.number()
    });
    const array_schema = Joi.array().items(schema);


    const { error, value } = array_schema.validate(req.body);
    if (error) {
        return res.status(500).send({ error_: error })
    }

    var response = [];
    for (element of value) {
        await PRODUCT.upsert(element).then((el)=>{
            response.push(el);
        }).catch((e)=>{
            console.log(`no se gardo ${element}`)
        });
    }
    return res.status(200).send(response);
}
exports.get_all = async (req, res, next) => {
    return await PRODUCT.findAll({})
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
}


exports.get_search = async (req, res, next) => {
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

exports.delete_product = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return res.status(500).send(error)
    }
    let product = await PRODUCT.findOne({ where: { id: value.id } }).catch(e => {
        console.log(e.message)
    });
    console.log(product)

    if (!product) {
        return res.status(500).send({ error: 'no se elimino' });

    }
    product.destroy();
    return res.status(200).send(product);


}
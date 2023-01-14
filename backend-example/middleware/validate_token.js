const jwt = require('jsonwebtoken');
const { USER } = require("../models/index");
require('dotenv').config('../.env');

exports.verify_token = (req, res, next) => {
    const token = req.header('Authorization');
    const TOKEN_SECRET = process.env.TOKEN_PASS;
    if (!token) {
        return res.status(401).json({
            'error': 'Acceso Denegado'
        });
    }
    try {
        const verificar = jwt.verify(
            token,
            TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        'error': 'Invalid token'
                    });
                } else {
                    req.decode = decoded;
                    USER.findOne({ where: { user_id: decoded.user_id } }).then((user) => {
                        if (user) {
                            next();
                        } else {
                            return res.status(401).json({ 'error': 'user invalid' });
                        }
                    });
                }
            }
        );
    } catch (e) {
        return res.status(400).json({
            error: e
        });
    }
};


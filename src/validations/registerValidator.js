const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage("El nombre es obligatorio"),
    check('email')
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Require formato email"),
    check('password')
        .notEmpty().withMessage("El password es obligatorio")
        .isLength({min: 6}).withMessage("Minimo 6 caracteres")

] 


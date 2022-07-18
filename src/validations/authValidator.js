const { check } = require('express-validator');

module.exports = [
    check('email')
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Require formato email"),
    check('password')
        .notEmpty().withMessage("El password es obligatorio")

] 


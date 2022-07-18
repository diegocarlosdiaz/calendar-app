const {check} = require('express-validator');
const moment = require('moment');
moment.locale('es');


 module.exports = [

    check('title')
                  .notEmpty().withMessage('Requerido'),
            
    check('start')
                  .notEmpty().withMessage("Requerido") 
                  .isDate().withMessage("Fecha de inicio invalida")
                  .custom((value,{req}) => {
                    if(moment(value).diff(moment(),'days') < 0) {
                        return false
                    } else {
                        return true
                    }
                  }).withMessage('La fecha de inicio debe ser igual o posterior a la actual!'),
          
    check('end')
                  .notEmpty().withMessage("Requerido") 
                  .isDate().withMessage("Fecha de finalizacion invalida")
                  .custom((value,{req}) => {
                    if(moment(value) < moment(req.body.start)) {
                        return false
                    } else {
                        return true
                    }
                  }).withMessage('la fecha de finalizacion debe ser posterior a la fecha de inicializacion'),


 ];
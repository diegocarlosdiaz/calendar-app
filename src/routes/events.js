var express = require('express');
var router = express.Router();
const EventController = require('../controllers/eventsController');
const validationJWT = require('../middlewares/validationJWT');
const validationsFields = require('../middlewares/validationsFields');
const eventValidator = require('../validations/eventValidator');
const updateValidator = require('../validations/updateValidator');
const {check} = require('express-validator');

router.use(validationJWT);

router.get   ('/', EventController.all);
router.post  ('/', eventValidator, validationsFields, EventController.create);
router.put   ('/:id',
              updateValidator,
              check('id').isMongoId().withMessage('No es un id valido de MONGO DB'),  
              validationsFields, 
              EventController.update);
router.delete('/:id',
              check('id').isMongoId().withMessage('No es un id valido de MONGO DB'), 
              validationsFields,
              EventController.remove);


module.exports = router;
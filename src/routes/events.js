var express = require('express');
var router = express.Router();
const EventController = require('../controllers/eventsController');
const validationJWT = require('../middlewares/validationJWT');
const validationsFields = require('../middlewares/validationsFields');
const eventValidator = require('../validations/eventValidator');

router.use(validationJWT);

router.get('/', EventController.all);
router.post('/', eventValidator, validationsFields, EventController.create);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.remove);


module.exports = router;
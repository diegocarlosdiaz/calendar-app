var express = require('express');
var router = express.Router();
const AuthControllers = require('../controllers/authController');
const registerValidator = require('../validations/registerValidator');
const validationsFields = require('../middlewares/validationsFields');
const authValidator = require('../validations/authValidator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/new',registerValidator,validationsFields, AuthControllers.userCreate)
router.post('/',authValidator, validationsFields,AuthControllers.userLogin)
module.exports = router;

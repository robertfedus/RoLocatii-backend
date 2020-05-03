const express = require('express');
const authController = require('./../controllers/authController');
const authValidation = require('./../controllers/validation/authValidation');
const authorization = require('./authorizaton');

const router = express.Router();

router.post('/register', authValidation.register, authController.register);
router.post('/login', authController.login);
router.delete('/', authorization.protected, authController.deleteUser);

module.exports = router;

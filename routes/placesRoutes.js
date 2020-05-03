const express = require('express');
const placesController = require('./../controllers/placesController');
const placesValidation = require('../controllers/validation/placesValidation');

const router = express.Router();

router.get('/', placesValidation.getPlaces, placesController.getPlaces);
router.get('/place', placesController.getPlace);

module.exports = router;

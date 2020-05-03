const express = require('express');
const reviewController = require('./../controllers/reviewController');
const { protected } = require('./authorizaton');

const router = express.Router();

router.post('/', protected, reviewController.postReview);

module.exports = router;

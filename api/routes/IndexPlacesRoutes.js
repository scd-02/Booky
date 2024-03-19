const express = require('express');
const { fetchAllPlaces, fetchSinglePlace } = require('../controllers/IndexPlaceController');

const router = express.Router();

router.get('/', fetchAllPlaces)
router.get('/:id', fetchSinglePlace)

module.exports = router;
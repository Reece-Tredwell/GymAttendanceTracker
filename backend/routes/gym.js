const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');

router.post('/setWorkout', gymController.setWorkout);

router.delete('/removeDate/:id', gymController.removeDate);

router.get('/getDates', gymController.getDates);

module.exports = router;
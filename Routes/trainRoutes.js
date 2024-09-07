const express = require('express');
const { addTrain, getTrainAvailability } = require('../controllers/trainController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAdminMiddleware = require('../middlewares/checkAdminMiddleware');
const router = express.Router();

router.post('/add-train', apiKeyMiddleware, authMiddleware,checkAdminMiddleware, addTrain);
router.get('/available-trains', authMiddleware, getTrainAvailability);

module.exports = router;

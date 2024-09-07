const express = require('express');
const { bookSeat, getBookingDetails } = require('../Controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/book-seat', authMiddleware, bookSeat);
router.get('/:booking_id', authMiddleware, getBookingDetails);

module.exports = router;

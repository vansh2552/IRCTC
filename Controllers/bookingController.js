const { createBooking, getBookingById } = require('../models/Booking');

const bookSeat = async (req, res) => {
    const { train_id, number_of_tickets } = req.body;
    const userId = req.user.userId;
  
    // Validate the number of tickets
    if (typeof number_of_tickets !== 'number' || number_of_tickets <= 0) {
      return res.status(400).json({ error: 'Invalid number of tickets' });
    }
  
    try {
      // Attempt to create the booking with the provided number of tickets
      const booking = await createBooking(userId, train_id, number_of_tickets);
  
      if (!booking) {
        return res.status(400).json({ error: 'Not enough seats available' });
      }
  
      // Respond with the booking details
      res.status(201).json({ booking });
    } catch (error) {
      console.error('Error during booking:', error);
      res.status(500).json({ error: 'An error occurred during booking' });
    }
  };
  
  const getBookingDetails = async (req, res) => {
    const bookingId = req.params.booking_id;
    const userId = req.user.userId;
  
    try {
      const booking = await getBookingById(bookingId, userId);
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.json({ booking });
    } catch (error) {
      console.error('Error retrieving booking details:', error);
      res.status(500).json({ error: 'An error occurred while retrieving booking details' });
    }
  };
  
  module.exports = { bookSeat, getBookingDetails };
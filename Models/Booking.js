// models/Booking.js
const pool = require('../config/db');

const createBooking = async (userId, trainId, numberOfTickets) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Lock the train row to prevent race conditions
    const trainResult = await client.query(
      'SELECT * FROM trains WHERE id = $1 FOR UPDATE',
      [trainId]
    );
    const train = trainResult.rows[0];

    // Check if the number of available seats is sufficient
    if (train.available_seats < numberOfTickets) {
      await client.query('ROLLBACK');
      return null; // Not enough seats available
    }

    // Update available seats
    await client.query(
      'UPDATE trains SET available_seats = available_seats - $1 WHERE id = $2',
      [numberOfTickets, trainId]
    );

    // Create booking
    const bookingResult = await client.query(
      'INSERT INTO bookings (user_id, train_id, tickets, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, trainId, numberOfTickets, 'confirmed']
    );

    await client.query('COMMIT');
    return bookingResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getBookingById = async (bookingId, userId) => {
  const result = await pool.query(
    `SELECT b.*, t.name as train_name, t.source, t.destination
     FROM bookings b
     JOIN trains t ON b.train_id = t.id
     WHERE b.id = $1 AND b.user_id = $2`,
    [bookingId, userId]
  );
  return result.rows[0];
};
module.exports = { createBooking, getBookingById };
const pool = require('../config/db');

const createTrain = async (name, source, destination, totalSeats) => {
  const result = await pool.query(
    'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *',
    [name, source, destination, totalSeats]
  );
  return result.rows[0];
};

const findTrainsByRoute = async (source, destination) => {
  const result = await pool.query(
    'SELECT * FROM trains WHERE source = $1 AND destination = $2', [source, destination]
  );
  return result.rows;
};

const updateTrainSeats = async (trainId, seatsToBook) => {
  const result = await pool.query(
    'UPDATE trains SET available_seats = available_seats - $1 WHERE id = $2 AND available_seats >= $1 RETURNING *',
    [seatsToBook, trainId]
  );
  return result.rows[0];
};

module.exports = { createTrain, findTrainsByRoute, updateTrainSeats };

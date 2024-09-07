const { createTrain, findTrainsByRoute } = require('../models/Train');

const addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  if (!name || !source || !destination || !totalSeats) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const train = await createTrain(name, source, destination, totalSeats);
  res.json({ train });
};

const getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;
  const trains = await findTrainsByRoute(source, destination);
  res.json({ trains });
};

module.exports = { addTrain, getTrainAvailability };

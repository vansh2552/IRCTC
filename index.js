require('dotenv').config();
const express = require('express');
const authRoutes = require('./Routes/authRoutes');
const trainRoutes = require('./Routes/trainRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/trains', trainRoutes);
app.use('/booking', bookingRoutes);

app.listen(PORT,() => {
    console.log("app running on port ${PORT}");
})
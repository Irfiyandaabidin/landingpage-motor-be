const dotenv = require("dotenv");
require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 4000;
const MotorRoute = require("./routes/MotorRoute")
const UserRoute = require("./routes/UserRoute")
const cors = require("cors");
const { Sequelize } = require('sequelize');
const config = require('./config/database');

const sequelize = new Sequelize(config.development);

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/motor', MotorRoute);
app.use('/api/v1/user', UserRoute);

app.listen(PORT, () => {
  console.log(`Server jalan di port: ${PORT}`)
});

module.exports = app;
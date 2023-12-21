const jwt = require('jsonwebtoken');
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new Error(
          'You are unauthorized to make this request, Login please', 401,
      );
    }
    const token = bearerToken.split('Bearer ')[1];
    const payload = jwt.verify(token, 'secret');
    const user = await User.findOne({
      where: {
        email: payload.email
      }
    })
    req.user = user;
    next();
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};
module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new Error('You are unauthorized to make this request. Please log in.', 401);
    }

    const token = bearerToken.split('Bearer ')[1];
    const payload = jwt.verify(token, 'secret');
    const user = await User.findOne({
      where: {
        email: payload.email
      }
    });

    if (!user) {
      throw new Error('User not found.', 404);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes

    // Return a more informative response to the client
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  }
};

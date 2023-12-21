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

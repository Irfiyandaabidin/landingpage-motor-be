const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        users
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json({
      status: "Success",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if(password == confirmPassword) {
      const salt = bcryptjs.genSaltSync(10)
      const hashPassword = bcryptjs.hashSync(password, salt);
      const newuser = await User.create({
        name,
        email,
        password : hashPassword
      })
      return res.status(200).json({
        status: "Success",
        data: {
          newuser
        }
      })
    }
    res.status(200).json({
      status: "Fail",
      message: "password and confirm password not match",
      data: null
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const updateUser = async (req, res) => {
  const { name } = req.body;
  try {
    const newuser = await User.update({
      name
    },
    {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json({
      status: "Success",
      data: {
        newuser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const deleteUserById = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json({
      status: "Success",
      data: {
        user
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const login = async(req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if(!user){
      return res.status(200).json({
        status: "Fail",
        data: null,
        message: "email or password false"
      })
    }
    const match = await bcryptjs.compare(password, user.password);
    if(!match) {
      return res.status(404).json({
        status: "Fail",
        data: null,
        message: "email or password false"
      })
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, 'secret', {
      expiresIn: '3d',
    });

    const refreshToken = jwt.sign(payload, 'secretRefresh', {
      expiresIn: '3d'
    });

    const data = {
      id: user.id,
      email: user.email,
      token: accessToken,
    };
    res.cookie('refreshToken', refreshToken);
    res.status(200).json({
      status: "Success",
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
}

const authMe = async (req, res) => {
  try {
    res.status(200).json(req.user) 
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message
    })
  }
}
module.exports = {
  getUser,
  createUser,
  getUserById,
  deleteUserById,
  updateUser,
  login,
  authMe
}
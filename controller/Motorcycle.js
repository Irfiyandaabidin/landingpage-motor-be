const { Motorcycle } = require("../models");

const getMotor = async (req, res) => {
  try {
    const motors = await Motorcycle.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        motors
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const getMotorById = async (req, res) => {
  try {
    const motor = await Motorcycle.findOne({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json({
      status: "Success",
      data: {
        motor
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const createMotor = async (req, res) => {
  const { brand, model, year, price } = req.body;
  try {
    const newMotor = await Motorcycle.create({
      brand, 
      model, 
      year, 
      price
    })
    res.status(201).json({
      status: "Success",
      data: {
        newMotor
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const updateMotor = async (req, res) => {
  const { brand, model, year, price } = req.body;
  try {
    const newMotor = await Motorcycle.update({
      brand, 
      model, 
      year, 
      price
    },
    {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json({
      status: "Success",
      data: {
        newMotor
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

const deleteMotorById = async (req, res) => {
  try {
    const motor = await Motorcycle.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json({
      status: "Success",
      data: {
        motor
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
}

module.exports = {
  getMotor,
  createMotor,
  getMotorById,
  deleteMotorById,
  updateMotor
}
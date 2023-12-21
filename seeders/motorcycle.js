'use strict';

const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for the Motorcycle model
    const motorcyclesData = [
      {
        brand: 'Yamaha',
        model: 'Vixion',
        year: 2022,
        price: 15000000.00,
        image: 'https://ik.imagekit.io/ku9epk6lrv/vixion.png?updatedAt=1703147528160'
      },
      {
        brand: 'Honda',
        model: 'Vario',
        year: 2021,
        price: 25000000.00,
        image: 'https://ik.imagekit.io/ku9epk6lrv/vario.png?updatedAt=1703189027013'
      },
      {
        brand: 'Honda',
        model: 'Beat',
        year: 2022,
        price: 10000000.00,
        image: 'https://ik.imagekit.io/ku9epk6lrv/beat.png?updatedAt=1703188576354'
      },
      {
        brand: 'Honda',
        model: 'Supra x',
        year: 2022,
        price: 17000000.00,
        image: 'https://ik.imagekit.io/ku9epk6lrv/supra.png?updatedAt=1703188648445'
      },
      // Add more data as needed
    ];

    // Using Sequelize bulkCreate to insert data into the database
    await models.Motorcycle.bulkCreate(motorcyclesData);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data seeded above
    await models.Motorcycle.destroy({ where: {} });
  }
};

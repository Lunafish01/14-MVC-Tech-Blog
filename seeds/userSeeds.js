const { User } = require('../models');

const userData = [
  {
    username: "jarryd_Trey",
    password: "password1",
  },
  {
    username: "TomSean_01",
    password: "password12",
  },
  {
    username: "MandyPandy",
    password: "password123",
  },
  {
    username: "Johnny_bravo",
    password: "password1234",
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
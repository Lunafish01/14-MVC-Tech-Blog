const sequelize = require("../config/connection");
const seedComments = require("./commentSeeds");
const seedPosts = require("./postSeeds");
const seedUsers = require("./userSeeds")

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();
  
  await seedComments();


  process.exit(0);
};

seedAll();

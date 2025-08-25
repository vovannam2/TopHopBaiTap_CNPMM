import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "node_fulltask",   // tên database
  "root",            // user MySQL
  "1234",      // password MySQL
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

module.exports = connectDB;

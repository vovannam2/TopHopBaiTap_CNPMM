import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("node_fulltask", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;

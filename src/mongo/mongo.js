const mongoose = require("mongoose");
// get dot env variables
const dotenv = require("dotenv");
dotenv.config();

const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
};

const DB_URI = `mongodb+srv://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${
  DB.HOST
}/${DB.NAME}`;

const connect = () => {
  return mongoose
    .connect(DB_URI)
    .then(() => {
      console.log(`Connected to MongoDB Database ${DB.NAME}`);
    })
    .catch(() => {
      console.log("MongoDB connection error while connecting");
    });
};

const close = () => {
  mongoose.connection.close(() => {
    console.log("Db connection closed");
  });
};

module.exports = { connect, close };

const mongoose = require("mongoose");

const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
  EXTRA_CONFIG: process.env.DB_CONFIG,
};

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const DB_URI = `mongodb+srv://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${
  DB.HOST
}/${DB.NAME}${DB.EXTRA_CONFIG}`;

const connect = () => {
  return mongoose
    .connect(DB_URI, options)
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

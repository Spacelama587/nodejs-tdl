import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("Connection to MongoDB succeeded."))
    .catch((err) => console.log(`MongoDB connection failed. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

export default connect;
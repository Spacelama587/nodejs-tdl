import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://thevijeeth:CXWFdRfYrEwTLpnG@express-mongo.rmjca.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo",
      {
        dbName: "todo_memo",
      },
    )
    .then(() => console.log("Connection to MongoDB succeeded."))
    .catch((err) => console.log(`MongoDB connection failed. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

export default connect;

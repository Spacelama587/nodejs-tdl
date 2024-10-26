import express from "express";
import connect from "./schemas/index.js";
import TodosRouter from "./routes/todos.router.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
const app = express();
const PORT = 3000;
connect();

// Access req.body from express and make the body data available.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Provide static files using Static middleware, express.static()

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hi!" });
});

app.use("/api", router, TodosRouter);

//registering error handler middleware

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "Server opened on port!");
});

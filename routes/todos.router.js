import express from "express";
import Todo from "../schemas/todo.schema.js";
import Joi from "joi";
const router = express.Router();

const createTodoSchema = Joi.object({
  value: Joi.string().min(1).max(50).required(),
});

router.post("/todos", async (req, res, next) => {
  try {
    //validate using joi

    const validation = await createTodoSchema.validateAsync(req.body);
    //storing the value data in a variable
    const { value } = validation;

    //if value does not exist, pass error message

    // if(!value) {
    //     return res
    //     .status(400)
    //     .json({errorMessage : 'To to-do data does not exist'})
    // }
    //using mongoose : find the 'todo with the the highest 'order' value in mONGOdB

    const todoMaxOrder = await Todo.findOne().sort("-order").exec();

    //Add 1 to the document with the highest 'order' value or assign 1 if it does not exist
    const order = todoMaxOrder ? todoMaxOrder.order + 1 : 1;

    //using Todod Model to create new toDo

    const todo = new Todo({ value, order });

    //save to mongodb

    await todo.save();

    return res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    // // pass join validation error to the client

    // if(error.name === "ValidationError"){
    //     return res.status(400).json({message: error.message})
    // }

    // //if a server related error occurs

    // return res
    // .status(500)
    // .json({errorMessage: 'An error occured on the server'})
    next(error);
  }
});

router.get("/todos", async (req, res) => {
  //using Todo model, find the to-dos with the highest order value in the database
  const todos = await Todo.find().sort("-order").exec();

  //passing found todos data to the client

  return res.status(200).json({ todos });
});

router.patch("/todos/:todoId", async (req, res) => {
  //get Id value

  const { todoId } = req.params;

  //get order number, plus error handlin

  const { order, done, value } = req.body;

  //mongoose: get the todo we want to change plus handle error

  const currentTodo = await Todo.findById(todoId).exec();

  if (!currentTodo) {
    return res.status(404).json({ errorMessage: "To do data does not exist" });
  }

  if (order) {
    //find todo that has the order value we want to change

    const targetTodo = await Todo.findOne({ order }).exec();

    if (targetTodo) {
      //changing the order value
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
  }

  //api for done todos

  if (done !== undefined) {
    //change the doneAt value
    currentTodo.doneAt = done ? new Date() : null;
  }

  if (value) {
    //change the value of the 'todo' you want to change
    currentTodo.value = value;
  }
  await currentTodo.save();

  return res.status(200).json({});
});

router.delete("/todos/:todoId", async (req, res) => {
  //get the id

  const { todoId } = req.params;

  const todo = await Todo.findById(todoId).exec();

  if (!todo) {
    return res
      .status(404)
      .json({ errorMessage: "The toto data does not exist" });
  }

  //delete

  await Todo.deleteOne({ _id: todoId }).exec();

  return res.status(200).json({});
});
export default router;

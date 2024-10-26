import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  doneAt: {
    type: Date,
    required: false,
  },
});
// This is code for front-end serving. It's okay if you don't know it!

TodoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});
TodoSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Todo", TodoSchema);

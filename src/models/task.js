const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// const newTask = new Task({ description: "Learn Mongoose" });

// newTask.save().then(() => {
//   console.log(newTask)
// }).catch(error => {
//   console.log(error.errors)
// })

module.exports = Task;
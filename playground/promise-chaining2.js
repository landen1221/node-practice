require("../src/db/mongoose");
const Task = require("../src/models/task");
const mongoose = require("mongoose");

const objectId = mongoose.Types.ObjectId("61d64599198f8d62ad6f86ee");

// Task.findOneAndDelete({ _id: objectId })
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((num) => {
//     console.log(`${num} tasks remaining`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const deleteTaskAndCount = async (id) => {
  const deletedtask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return { deletedtask, count };
};

deleteTaskAndCount("61d73afb21ca5cd3079d93b1")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

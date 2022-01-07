require("../src/db/mongoose");
const User = require("../src/models/user");

const id = "61d73e39c2931e3d163ad973";

// User.findByIdAndUpdate(id, { age: 32 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 32 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const userUpdated = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { userUpdated, count };
};

updateAgeAndCount("61d73e39c2931e3d163ad973", 54)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

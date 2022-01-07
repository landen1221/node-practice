const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routers/user');
const taskRoutes = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

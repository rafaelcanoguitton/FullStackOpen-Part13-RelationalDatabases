const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDb } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  response.status(400).json(JSON.stringify(error.message)).end();
  next(error);
};

app.use(errorHandler);

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

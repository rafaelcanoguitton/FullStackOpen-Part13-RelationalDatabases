const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDb } = require("./util/db");

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  response.status(400).end();
  next(error);
};

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

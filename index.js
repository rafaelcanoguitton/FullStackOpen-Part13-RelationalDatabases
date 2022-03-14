const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDb } = require("./util/db");

const { Blog } = require("./models");
const { sequelize } = require("./util/db");

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
app.get("/api/authors", (req, res, next) => {
  try {
    //group by author and aggregate count of blogs
    const authors = Blog.findAll({
      group: ["author"],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
        "author",
        "likes",
      ],
      order: [["likes", "DESC"]],
    });
    res.json(JSON.stringify(authors));
  } catch (error) {
    next(error);
  }
});
const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

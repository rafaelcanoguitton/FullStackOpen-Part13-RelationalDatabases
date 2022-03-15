const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findOne({
    where: {
      id: req.params.blog_id,
    },
  });
  next();
};

router.post("/", userFinder, blogFinder, async (req, res, next) => {
  try {
    const readingList = await ReadingList.create({
      userId: req.user.id,
      blogId: req.blog.id,
    });
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});


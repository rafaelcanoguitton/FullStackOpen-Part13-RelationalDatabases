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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(SECRET);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findOne({
      where: {
        id: req.params.id,
        id_user: req.decodedToken.id,
      },
    });
    readingList.read = req.body.read;
    await readingList.save();
    res.json(readingList);
  } catch (error) {}
});

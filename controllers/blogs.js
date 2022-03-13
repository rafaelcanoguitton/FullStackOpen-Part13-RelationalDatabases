const router = require("express").Router();

const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(JSON.stringify(blogs));
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(JSON.stringify(blog));
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", blogFinder, async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(JSON.stringify(blog));
  } catch (error) {
    next(error);
  }
});
router.put("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.likes += 1;
      await blog.save();
      res.json({ likes: blog.likes });
    }
    res.status(404).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;

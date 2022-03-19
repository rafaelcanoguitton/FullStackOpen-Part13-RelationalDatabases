const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, User, Session } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
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

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.search) {
      where.title,
        (where.author = {
          [Op.substring]: req.query.search,
        });
    }
    const blogs = await Blog.findAll({
      attributes: {
        exclude: ["userId"],
        include: { model: User, attributes: ["name"] },
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(JSON.stringify(blogs));
  } catch (error) {
    next(error);
  }
});
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    const session = await Session.findByPk(req.decodedToken.sessionId);
    if (!session) {
      return res.status(401).json({ error: "token invalid" });
    }
    res.json(JSON.stringify(blog));
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
        id_user: user.id,
      },
    });
    const session = await Session.findByPk(req.decodedToken.sessionId);
    if (!session) {
      return res.status(401).json({ error: "token invalid" });
    }
    res.json(JSON.stringify(blog));
  } catch (error) {
    next(error);
  }
});
router.put("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog) {
      const user = await User.findByPk(req.decodedToken.id);
      if (req.blog.userId != user.id) {
        return res.status(400).json({ error: "That blog isn't yours!" }).end();
      }
      const session = await Session.findByPk(req.decodedToken.sessionId);
      if (!session) {
        return res.status(401).json({ error: "token invalid" });
      }
      req.blog.likes += 1;
      await req.blog.save();
      res.json({ likes: blog.likes });
    }
    res.status(404).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;

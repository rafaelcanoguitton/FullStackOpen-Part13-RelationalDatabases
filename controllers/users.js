const router = require("express").Router();

const { user } = require("pg/lib/defaults");
const { User } = require("../models");

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  next();
};

router.post("/", async (req, res, next) => {
  try {
    const user = await Blog.create(req.body);
    res.json(JSON.stringify(user));
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(JSON.stringify(users));
  } catch (error) {
    next(error);
  }
});

router.put("/:username", userFinder, async (req, res, next) => {
  try {
    req.user.username = req.body.username;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

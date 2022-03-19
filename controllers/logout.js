const router = require("express").Router();
const { User, Session } = require("../models/index");

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
router.delete("/", tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: {
      id: req.decodedToken.sessionId,
    },
  });

  res.status(204).send();
});

module.exports = router;

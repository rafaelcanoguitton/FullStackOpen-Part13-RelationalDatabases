const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { User, Session } = require("../models");

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });
    const passwordCorrect = body.password === "secret";

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }
    if (user.disabled) {
      return response.status(401).json({ error: "user disabled" });
    }
    const session = await Session.create({ userId: user.id });
    const userForToken = {
      username: user.username,
      id: user.id,
      sessionId: session.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readinglist");
const Session = require("./session");
User.hasMany(Blog);
Blog.belongsTo(User);
//Blog.sync({ alter: true });
//User.sync({ alter: true });
User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });
User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};

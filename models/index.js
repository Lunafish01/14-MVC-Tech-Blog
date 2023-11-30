const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//define associations between models

//a user can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

//a post belongs to a user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

//a comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

//a comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

//a user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

//a post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { User, Post, Comment };

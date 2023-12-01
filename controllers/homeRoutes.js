const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const sequelize = require('../config/connection');

//GET request to get all posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "created_at", "post_content"],
    //   order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["id", "title", "created_at", "post_content"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

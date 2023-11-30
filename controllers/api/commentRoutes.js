const express = require("express").Router();
const withAuth = require("../../utils/auth");
const { Comment } = require("../../models");

//GET request to get all comments
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET request to get comments by ID
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST request to create new comment
router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      // Create a new comment in the database
      const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(dbCommentData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

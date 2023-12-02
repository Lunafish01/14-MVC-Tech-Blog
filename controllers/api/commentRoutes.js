const router = require("express").Router();
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

//GET request to get comments by id
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
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

//PUT request to update a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows, [updatedCommentData]] = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!affectedRows) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.json(updatedCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

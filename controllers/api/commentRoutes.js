const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Comment, User, Post } = require("../../models");

//GET request to get all comments
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    res.json(dbCommentData);
  } catch (err) {
    console.error("Error in commentRoutes GET /:" , err);
    res.status(500).json({ error: "Internal server error. Unable to fetch comment data" });
  }
});

//GET request to get comments by id
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      atrributes: ["user_id", "post_id", "comment_text"],
      include: [
        {
          model: User,
          atrributes: ["username"],
        },
        {
          model: Post,
          atrributes: ["title", "post_content"],
        }
      ]
    });

    if (!dbCommentData) {
      res.status(404).json({ message: "Entry not found" })
    }
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
    res.status(400).json({ error: "Internal server error" });
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
          user_id: req.params.user_id
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
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE request to delete user by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedRows = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;

const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post, User, Comment } = require("../../models");

//GET request to get all posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "created_at", "post_content"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["id", "title", "created_at", "post_content"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    res.json(dbPostData);
  } catch (err) {
    console.error("Error in postRoutes GET /:", err);
    res.status(500).json(err);
  }
});

//GET request to get posts by id
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "title", "created_at", "post_content", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "Post entry not found" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//POST request to create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PUT request to update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows, [updatedPostData]] = await Post.update(
      {
        title: req.body.title,
        post_content: req.body.post_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!affectedRows) {
      res.status(404).json({ message: "Post entry not found" });
      return;
    }
    res.json(updatedPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete route to delete user by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedRows) {
      res.status(404).json({ message: "Post entry not found" });
      return;
    }

    res.json({ message: "Post entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

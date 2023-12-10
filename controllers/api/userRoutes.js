const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

//define a route for handling GET requests to '/api/users'
router.get("/", async (req, res) => {
  try{
    const dbUserData = await User.findAll({
    attributes: { exclude: ["password"] },
  });
    console.log("Data retrival successful");
    
    res.json(dbUserData);
    } catch (err) {
      console.error("Error", err);
      res.status(500).json(err);
    }
});

//define a route for handling GET requests to '/api/users/:id'
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const dbUserData = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!dbUserData) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).son({ error: "Internal Sever Error" });
  }
});

// Define a route for handling POST requests to create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dbUserData = await User.create({
      username,
      email,
      password,
    });
    // Save user session data using req.session
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json(dbUserData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route for handling user login
router.post("/login", async (req, res) => {
  try {
    console.log("Username", req.body.uersname);
    console.log("Password", req.body.password);

    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      //Declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST route for handling user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// //PUT route for updating user data by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const [affectedRows] = await User.update(req.body, {
//       individualHooks: true,
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows === 0) {
//       res.status(404).json({ message: "No user found with this id" });
//       return;
//     }

//     res.json({ message: "Update successful" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;

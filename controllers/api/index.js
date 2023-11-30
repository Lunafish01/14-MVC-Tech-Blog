const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutesRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/Users", userRoutes);
router.use("/Post", postRoutes);
router.use("/Comment", commentRoutes);
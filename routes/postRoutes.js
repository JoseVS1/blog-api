const { Router } = require("express");
const passport = require("passport");
const postController = require("../controllers/postController");
const postCommentRoutes = require("./postCommentRoutes");

const postRoutes = Router();

postRoutes.get("/", postController.getAllPosts);
postRoutes.get("/:id", postController.getSinglePost);
postRoutes.post("/", passport.authenticate("jwt", {session: false}), postController.postCreatePost);
postRoutes.put("/:id", passport.authenticate("jwt", {session: false}), postController.putUpdatePost);
postRoutes.delete("/:id", passport.authenticate("jwt", {session: false}), postController.deletePost);

postRoutes.use("/:id/comments", postCommentRoutes);

module.exports = postRoutes;
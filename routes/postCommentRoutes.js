const { Router } = require("express");
const postCommentController = require('../controllers/postCommentController');
const passport = require("passport");

const postCommentRoutes = Router({ mergeParams: true });

postCommentRoutes.get("/", postCommentController.getPostComments);
postCommentRoutes.post("/", passport.authenticate("jwt", {session: false}), postCommentController.postCreatePostComment);

module.exports = postCommentRoutes;
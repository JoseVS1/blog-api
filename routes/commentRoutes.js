const { Router } = require("express");
const commentController = require("../controllers/commentController");
const passport = require("passport");

const commentRoutes = Router();

commentRoutes.put("/:id", passport.authenticate("jwt", {session: false}), commentController.putUpdateComment);
commentRoutes.delete("/:id", passport.authenticate("jwt", {session: false}), commentController.deleteComment);

module.exports = commentRoutes;
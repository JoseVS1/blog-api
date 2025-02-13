const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport")

const userRoutes = Router();

userRoutes.post("/signup", userController.postRegister);
userRoutes.post("/login", userController.postLogin);
userRoutes.get("/:id", userController.getUser);
userRoutes.put("/:id/author", passport.authenticate("jwt", {session: false}), userController.putUpdateUserAuthorStatus);

module.exports = userRoutes;
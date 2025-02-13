const { Router } = require("express");
const apiController = require("../controllers/apiController");
const userRouter = require("./userRoutes");
const postRouter = require("./postRoutes");
const commentRouter = require("./commentRoutes");

const apiRoutes = Router();

apiRoutes.get("/", apiController.getApiMessage);

apiRoutes.use("/users", userRouter);
apiRoutes.use("/posts", postRouter);
apiRoutes.use("/comments", commentRouter);

module.exports = apiRoutes;
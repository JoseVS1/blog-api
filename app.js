const express = require("express");
const passport = require("passport");
const apiRouter = require("./routes/apiRoutes");
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
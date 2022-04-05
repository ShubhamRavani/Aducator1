const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const projectRoutes = require("./routes/project/projectRoute");
const publicationRoutes = require("./routes/publication/publicationRoute");
const commentRoutes = require("./routes/comments/commentRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
//cors
app.use(cors());

//DB
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);

//Project route
app.use("/api/projects", projectRoutes);

//Publication route
app.use("/api/publications", publicationRoutes);

//Comment Route
app.use("/api/comments", commentRoutes);

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//3wlFBGEh7XTcFjfm

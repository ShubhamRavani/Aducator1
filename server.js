const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const projectRoutes = require("./routes/project/projectRoute");
const courseRoute = require("./routes/Course/courseRoute")
const publicationRoutes = require("./routes/publication/publicationRoute");
const commentRoutes = require("./routes/comments/commentRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const emailMsgRoute = require("./routes/emailMsg/emailMsgRoute");
const categoryRoute = require("./routes/category/categoryRoute");
const paperCategory = require('./routes/paperCategory/Papercat')
const courseCategory = require("./routes/courseCategory/courseCat")

const PaperComment = require('./routes/comments/paperComment')
const CourseComment = require('./routes/comments/courseComment')


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

// Course route
app.use("/api/course" , courseRoute)

//Publication route
app.use("/api/publications", publicationRoutes);

//Comment Route
app.use("/api/comments", commentRoutes);

//PaperComment Route
app.use("/api/papercomments", PaperComment);

//Comment Route
app.use("/api/coursecomments", CourseComment);

//Email Message Route
app.use("/api/email", emailMsgRoute);

//Category Route
app.use("/api/category", categoryRoute);

//PaperCategory Route
app.use("/api/paperCategory", paperCategory);

//course Categort 
app.use("/api/courseCategory" , courseCategory)

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//3wlFBGEh7XTcFjfm

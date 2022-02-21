const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);

//err handler
app.use(notFound);
app.use(errorHandler);


//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//3wlFBGEh7XTcFjfm

//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  api key

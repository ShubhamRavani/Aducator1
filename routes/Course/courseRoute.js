const express = require("express");
const { 
    createProjectCtrl,
    fetchProjectsCtrl, 
    fetchProjectCtrl,
    updateProjectCtrl,
    deleteProjectCtrl,
    toggleAddLikeToProjectCtrl,

} = require("../../controllers/Course/courseControl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const courseRoute = express.Router();

const {
    screenShotUpload,
    screenShotResize,
  } = require("../../middlewares/uploads/screenShotUpload");

courseRoute.post("/", authMiddleware, createProjectCtrl);
courseRoute.put("/likes", authMiddleware, toggleAddLikeToProjectCtrl);
courseRoute.put(
    "/screenshot-upload",
    authMiddleware,
    screenShotUpload.array("image"),
    screenShotResize,
    
  );
courseRoute.get("/", fetchProjectsCtrl);
courseRoute.get("/:id", fetchProjectCtrl);
courseRoute.put("/:id", authMiddleware, updateProjectCtrl);
courseRoute.delete("/:id", authMiddleware, deleteProjectCtrl);


module.exports = courseRoute;

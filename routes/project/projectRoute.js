const express = require("express");
const { 
    createProjectCtrl,
    fetchProjectsCtrl, 
    fetchProjectCtrl,
    updateProjectCtrl,
    deleteProjectCtrl,
    toggleAddLikeToProjectCtrl,

} = require("../../controllers/project/projectCtrl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const projectRoute = express.Router();

const {
    screenShotUpload,
    screenShotResize,
  } = require("../../middlewares/uploads/screenShotUpload");

projectRoute.post("/", authMiddleware, createProjectCtrl);
projectRoute.put("/likes", authMiddleware, toggleAddLikeToProjectCtrl);
projectRoute.put(
    "/screenshot-upload",
    authMiddleware,
    screenShotUpload.array("image"),
    screenShotResize,
    
  );
projectRoute.get("/", fetchProjectsCtrl);
projectRoute.get("/:id", fetchProjectCtrl);
projectRoute.put("/:id", authMiddleware, updateProjectCtrl);
projectRoute.delete("/:id", authMiddleware, deleteProjectCtrl);


module.exports = projectRoute;

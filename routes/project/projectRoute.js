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


projectRoute.post("/", authMiddleware, createProjectCtrl);
projectRoute.put("/likes", authMiddleware, toggleAddLikeToProjectCtrl);
projectRoute.get("/", fetchProjectsCtrl);
projectRoute.get("/:id", fetchProjectCtrl);
projectRoute.put("/:id", authMiddleware, updateProjectCtrl);
projectRoute.delete("/:id", authMiddleware, deleteProjectCtrl);


module.exports = projectRoute;

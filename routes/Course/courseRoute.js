const express = require("express");
const { 
  createPublicationCtrl,
  fetchPublicationsCtrl,
  fetchPublicationCtrl,
  updatePublicationCtrl,
  deletePublicationCtrl,
  toggleAddLikeToPublicationCtrl,

} = require("../../controllers/Course/courseControl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const courseRoute = express.Router();

const {
    screenShotUpload,
    screenShotResize,
  } = require("../../middlewares/uploads/screenShotUpload");

courseRoute.post("/", authMiddleware, createPublicationCtrl);
courseRoute.put("/likes", authMiddleware, toggleAddLikeToPublicationCtrl);
courseRoute.put(
    "/screenshot-upload",
    authMiddleware,
    screenShotUpload.array("image"),
    screenShotResize,
    
  );
courseRoute.get("/", fetchPublicationsCtrl);
courseRoute.get("/:id", fetchPublicationCtrl);
courseRoute.put("/:id", authMiddleware, updatePublicationCtrl);
courseRoute.delete("/:id", authMiddleware, deletePublicationCtrl);


module.exports = courseRoute;

const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/CourseCommentCrt");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const CourseComment = express.Router();

CourseComment.post("/", authMiddleware, createCommentCtrl);
CourseComment.get("/", authMiddleware, fetchAllCommentsCtrl);
CourseComment.get("/:id", authMiddleware, fetchCommentCtrl);
CourseComment.put("/:id", authMiddleware, updateCommentCtrl);
CourseComment.delete("/:id", authMiddleware, deleteCommentCtrl);
module.exports = CourseComment;

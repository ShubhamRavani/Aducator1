const express = require("express");
const {
  createCourseCommentCtrl,
  fetchAllCourseCommentsCtrl,
  fetchCourseCommentCtrl,
  updateCourseCommentCtrl,
  deleteCourseCommentCtrl,
} = require("../../controllers/comments/CourseCommentCrt");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const courseComment = express.Router();

courseComment.post("/", authMiddleware, createCourseCommentCtrl);
courseComment.get("/", authMiddleware, fetchAllCourseCommentsCtrl);
courseComment.get("/:id", authMiddleware, fetchCourseCommentCtrl);
courseComment.put("/:id", authMiddleware, updateCourseCommentCtrl);
courseComment.delete("/:id", authMiddleware, deleteCourseCommentCtrl);

module.exports = courseComment;

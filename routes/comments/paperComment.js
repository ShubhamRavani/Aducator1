const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/PaperCommentcrt");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const PaperComment = express.Router();

PaperComment.post("/", authMiddleware, createCommentCtrl);
PaperComment.get("/", authMiddleware, fetchAllCommentsCtrl);
PaperComment.get("/:id", authMiddleware, fetchCommentCtrl);
PaperComment.put("/:id", authMiddleware, updateCommentCtrl);
PaperComment.delete("/:id", authMiddleware, deleteCommentCtrl);
module.exports = PaperComment;

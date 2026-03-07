const express = require("express");
const {
  deletePaperCommentCtrl,
  updatePaperCommentCtrl,
  createPaperCommentCtrl,
  fetchAllPaperCommentsCtrl,
  fetchPaperCommentCtrl,
} = require("../../controllers/comments/PaperCommentCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const PaperComment = express.Router();

PaperComment.post("/", authMiddleware, createPaperCommentCtrl);
PaperComment.get("/", authMiddleware, fetchAllPaperCommentsCtrl);
PaperComment.get("/:id", authMiddleware, fetchPaperCommentCtrl);
PaperComment.put("/:id", authMiddleware, updatePaperCommentCtrl);
PaperComment.delete("/:id", authMiddleware, deletePaperCommentCtrl);

module.exports = PaperComment;

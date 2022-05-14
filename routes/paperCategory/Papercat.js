const express = require("express");
const {
  createCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCateoryCtrl,
} = require("../../controllers/PaperCategory/PaperCat");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const paperCategory = express.Router();

paperCategory.post("/", createCategoryCtrl);
paperCategory.get("/", authMiddleware, fetchCategoriesCtrl);
paperCategory.get("/:id", authMiddleware, fetchCategoryCtrl);
paperCategory.put("/:id", authMiddleware, updateCategoryCtrl);
paperCategory.delete("/:id", authMiddleware, deleteCateoryCtrl);


module.exports = paperCategory;

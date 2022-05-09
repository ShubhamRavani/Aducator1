const mongoose = require("mongoose");

const courseCategory = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseCategory = mongoose.model("CourseCategory", courseCategory);

module.exports = CourseCategory;

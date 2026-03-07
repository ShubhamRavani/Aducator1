const mongoose = require("mongoose");

const CourseCommentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: [true, "Course is required"],
    },
    user: {
      type: Object,
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  { timestamps: true }
);

const CourseComment = mongoose.model("courseComment", CourseCommentSchema);

module.exports = CourseComment;

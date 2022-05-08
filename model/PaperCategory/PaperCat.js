const mongoose = require("mongoose");

const PapercategorySchema = new mongoose.Schema(
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

const PaperCategory = mongoose.model("PaperCategory", PapercategorySchema);

module.exports = PaperCategory;

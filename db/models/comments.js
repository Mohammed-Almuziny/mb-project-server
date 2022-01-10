const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  description: { type: String, required: true },
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  replays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Replys" }],
  isBocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Comments", comments);

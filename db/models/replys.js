const mongoose = require("mongoose");

const replys = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  description: { type: String, required: true },
  reference: {
    type: mongoose.Schema.Types.String,
    ref: "Comments",
    required: true,
  },
  isBocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Replys", replys);

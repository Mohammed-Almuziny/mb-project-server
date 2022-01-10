const mongoose = require("mongoose");

const reviews = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  reference: {
    type: mongoose.Schema.Types.String,
    ref: "Courses",
    required: true,
  },
  isBocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Reviews", reviews);

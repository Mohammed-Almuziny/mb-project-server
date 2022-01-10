const mongoose = require("mongoose");

const courses = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  category: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  lessonSections: [
    {
      sectionName: { type: String, required: true },
      lessons: [
        {
          lessonName: { type: String, required: true },
          lesson: { type: String, required: true },
        },
      ],
    },
  ],
  comments: [{ type: mongoose.Schema.Types.String, ref: "Comments" }],
  reviews: [{ type: mongoose.Schema.Types.String, ref: "reviews" }],
  isBocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Courses", courses);

const mongoose = require("mongoose");

const users = new mongoose.Schema({
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    default: "61c180abb4d7969ff7b3683a",
  },
  headline: { type: String },
  about: { type: String },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  enrole: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  isVerified: { type: Boolean, default: false },
  isBocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Users", users);

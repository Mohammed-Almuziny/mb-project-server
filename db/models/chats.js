const mongoose = require("mongoose");

const chats = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  messages: [
    {
      content: { type: String, required: true },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Chats", chats);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const socket = require("socket.io");
require("dotenv").config();

require("./db");
const chatsModel = require("./db/models/chats");

const userRouter = require("./routers/routes/users");
const rolesRouter = require("./routers/routes/roles");
const coursesRouter = require("./routers/routes/courses");
const commentsRouter = require("./routers/routes/comments");
const replysRouter = require("./routers/routes/replys");
const chatsRouter = require("./routers/routes/chats");
const reviewsRouter = require("./routers/routes/reviews");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use(rolesRouter);
app.use("/course", coursesRouter);
app.use("/comments", commentsRouter);
app.use("/replys", replysRouter);
app.use("/chats", chatsRouter);
app.use("/reviews", reviewsRouter);

app.get("/",  (req, res) => {
  res.send("hello world!")
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connect");

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.userName} has entered the room number ${data.room}`);
  });

  socket.on("send_message", (data) => {
    chatsModel
      .findByIdAndUpdate(
        data.room,
        {
          $push: { messages: { content: data.content, sender: data.sender } },
        },
        { new: true }
      )
      .then((result) => {
        io.to(data.room).emit("recieve_message", result.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

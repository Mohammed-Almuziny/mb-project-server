const commentModel = require("./../../db/models/comments");
const replysModel = require("./../../db/models/replys");

const addReply = (req, res) => {
  try {
    const { creator, description, reference } = req.body;

    const newReply = new replysModel({
      creator,
      description,
      reference,
    });

    newReply
      .save()
      .then((result) => {
        commentModel
          .findByIdAndUpdate(
            reference,
            {
              $push: { replays: result._id },
            },
            { new: true }
          )
          .populate("replays")
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(400).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReplyById = (req, res) => {
  try {
    replysModel
      .find({ _id: req.params.replyId, isBocked: false })
      .then((result) => {
        if (result && result[0]) res.status(200).json(result);
        else res.status(404).json({ error: " reply not found" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const blockReply = (req, res) => {
  try {
    replysModel
      .findByIdAndUpdate(req.params.replyId, { isBocked: true }, { new: true })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addReply, getReplyById, blockReply };

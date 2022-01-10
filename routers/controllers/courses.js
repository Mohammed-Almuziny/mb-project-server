const coursesModel = require("./../../db/models/courses");

const getAllCourses = (req, res) => {
  try {
    coursesModel
      .find({ isBocked: false })
      .populate("comments")
      .populate({ path: "creator", select: "name avatar" })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ err: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createCourse = (req, res) => {
  try {
    const { thumbnail, title, about, description, creator, category } =
      req.body;

    const newCourse = coursesModel({
      thumbnail,
      title,
      about,
      description,
      creator,
      category,
    });

    newCourse
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const coursesSearch = (req, res) => {
  try {
    const regexTerm = new RegExp(req.params.term);

    coursesModel
      .find({ title: regexTerm, isBocked: false })
      .populate("comments")
      .populate({ path: "creator", select: "name avatar" })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ err: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCourseByCategory = (req, res) => {
  try {
    const category = req.params.category;

    coursesModel
      .find({ category, isBocked: false })
      .populate("comments")
      .populate({ path: "creator", select: "name avatar" })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const addSection = (req, res) => {
  try {
    const { courseId, sectionName } = req.body;

    coursesModel
      .findByIdAndUpdate(
        courseId,
        { $push: { lessonSections: { sectionName, lesson: [] } } },
        { new: true }
      )
      .then((result) => res.status(201).json(result));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addLesson = (req, res) => {
  try {
    const { courseId, sectionIndex, lessonName, lesson } = req.body;

    coursesModel.findById(courseId).then((result) => {
      const update = result.lessonSections;

      update[sectionIndex].lessons.push({ lessonName, lesson });

      coursesModel
        .findByIdAndUpdate(courseId, { lessonSections: update }, { new: true })
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const isStudent = (req, res) => {
  const { courseId, userId } = req.body;
  try {
    coursesModel
      .findById(courseId)
      .then((result) => {
        if (result) res.status(200).json(result.students.includes(userId));
        else res.status(404).json({ error: " course not found" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getCourseById = (req, res) => {
  try {
    coursesModel
      .findById(req.params.courseId, { isBocked: false })
      .populate("comments")
      .populate({
        path: "comments",
        populate: [
          { path: "creator", select: "name avatar" },
          {
            path: "replays",
            populate: [{ path: "creator", select: "name avatar" }],
          },
        ],
      })
      .populate({ path: "creator", select: "name avatar" })
      .then((result) => {
        if (result) {
          result.comments = result.comments.filter(
            (comment) => comment.isBocked === false
          );

          result.comments.forEach(
            (_, i) =>
              (result.comments[i].replays = result.comments[i].replays.filter(
                (reply) => reply.isBocked === false
              ))
          );

          res.status(200).json(result);
        } else res.status(404).json({ error: " course not found" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const updateCourseById = (req, res) => {
  try {
    const { title, about, description } = req.body;

    const update = {};
    if (title) update.title = title;
    if (about) update.about = about;
    if (description) update.description = description;

    coursesModel
      .findByIdAndUpdate(req.params.courseId, update, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const blockCourse = (req, res) => {
  try {
    coursesModel
      .findByIdAndUpdate(req.params.courseId, { isBocked: true }, { new: true })
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

module.exports = {
  getAllCourses,
  createCourse,
  coursesSearch,
  getCourseByCategory,
  addSection,
  addLesson,
  isStudent,
  getCourseById,
  updateCourseById,
  blockCourse,
};

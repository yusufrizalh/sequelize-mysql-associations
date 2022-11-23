const model = require("../models");
const Tag = model.tags;
const Course = model.courses;

// create new tag
exports.createTag = (tag) => {
  return Tag.create({
    name: tag.name,
  })
    .then((tag) => {
      console.log(">> Creating tag: " + JSON.stringify(tag, null, 4));
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while creating tag: ", err);
    });
};

// find all tags
exports.findAllTags = () => {
  return Tag.findAll({
    include: [
      {
        model: Course,
        as: "courses",
        attributes: ["id", "name", "price", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tags) => {
      return tags;
    })
    .catch((err) => {
      console.log(">> Error while finding all tags: ", err);
    });
};

// find tag by id
exports.findTagById = (id) => {
  return Tag.findByPk(id, {
    include: [
      {
        model: Course,
        as: "courses",
        attributes: ["id", "name", "price", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tag) => {
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while finding tag: ", err);
    });
};

// create new course_tag
exports.addCourseToTag = (tagId, courseId) => {
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag Not Found");
        return null;
      }
      return Course.findByPk(courseId).then((course) => {
        if (!course) {
          console.log("Course Not Found");
          return null;
        }

        // jika semua pengecekan telah dipenuhi
        tag.addCourses(course);
        console.log(`>> Add course id: ${course.id} to tag id: ${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding course to tag: ", err);
    });
};

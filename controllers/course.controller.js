const model = require("../models");
const Course = model.courses;
const Tag = model.tags;

// create new course
exports.createCourse = (categoryId, course) => {
  return Course.create({
    name: course.name,
    price: course.price,
    description: course.description,
    categoryId: categoryId,
  })
    .then((course) => {
      console.log(">> Creating course: " + JSON.stringify(course, null, 4));
      return course;
    })
    .catch((err) => {
      console.log(">> Error while creating course: ", err);
    });
};

// find all courses
exports.findAllCourses = () => {
  return Course.findAll({
    include: [
      "category",
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: ["tag_id", "course_id"],
        },
      },
    ],
  })
    .then((courses) => {
      return courses;
    })
    .catch((err) => {
      console.log(">> Error while finding all courses: ", err);
    });
};

// find course by id
exports.findCourseById = (courseId) => {
  return Course.findByPk(courseId, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: ["tag_id", "course_id"],
        },
      },
    ],
  })
    .then((course) => {
      return course;
    })
    .catch((err) => {
      console.log(">> Error while finding course: ", err);
    });
};

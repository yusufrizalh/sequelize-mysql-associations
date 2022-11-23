const model = require("./models/index.js");
const courseController = require("./controllers/course.controller.js");
const categoryController = require("./controllers/category.controller.js");
const tagController = require("./controllers/tag.controller.js");

const run = async () => {
  // test create new category
  const category1 = await categoryController.createCategory({
    title: "Web Server",
    description: "Lorem ipsum web server",
  });
  const category2 = await categoryController.createCategory({
    title: "Web Development",
    description: "Lorem ipsum web development",
  });
  const category3 = await categoryController.createCategory({
    title: "Mobile Programming",
    description: "Lorem ipsum mobile programming",
  });

  // test create new course
  const course1 = await courseController.createCourse(category2.id, {
    name: "Building Web App with React.js",
    price: 7500,
    description: "Lorem ipsum",
  });
  const course2 = await courseController.createCourse(category2.id, {
    name: "Building Web App with Vue.js",
    price: 6200,
    description: "Lorem ipsum vue.js",
  });
  const course3 = await courseController.createCourse(category2.id, {
    name: "Building Web App with Angular",
    price: 9400,
    description: "Lorem ipsum Angular",
  });
  const course4 = await courseController.createCourse(category3.id, {
    name: "Mobile App Development with React Native",
    price: 12400,
    description: "Lorem ipsum React Native",
  });
  const course5 = await courseController.createCourse(category3.id, {
    name: "Mobile App Development with Flutter",
    price: 12400,
    description: "Lorem ipsum Flutter",
  });
  const course6 = await courseController.createCourse(category1.id, {
    name: "REST API with Node.js and Express",
    price: 15400,
    description: "Lorem ipsum Node.js Express",
  });

  // test create new tag
  const tag1 = await tagController.createTag({ name: "HTML" });
  const tag2 = await tagController.createTag({ name: "CSS" });
  const tag3 = await tagController.createTag({ name: "JS" });

  // test add courses to tags
  await tagController.addCourseToTag(tag1.id, course1.id);
  await tagController.addCourseToTag(tag1.id, course2.id);
  await tagController.addCourseToTag(tag1.id, course3.id);
  await tagController.addCourseToTag(tag2.id, course1.id);
  await tagController.addCourseToTag(tag2.id, course2.id);
  await tagController.addCourseToTag(tag3.id, course3.id);
  await tagController.addCourseToTag(tag1.id, course4.id);
  await tagController.addCourseToTag(tag2.id, course4.id);
  await tagController.addCourseToTag(tag3.id, course4.id);
  await tagController.addCourseToTag(tag1.id, course5.id);
  await tagController.addCourseToTag(tag2.id, course5.id);
  await tagController.addCourseToTag(tag1.id, course6.id);
  await tagController.addCourseToTag(tag3.id, course6.id);

  // test get all courses
  const allCourses = await courseController.findAllCourses();
  console.log("All Courses: ", JSON.stringify(allCourses, null, 4));

  //   // test get all categories
  //   const allCategories = await categoryController.findAllCategories();
  //   console.log("All Categories: ", JSON.stringify(allCategories, null, 4));

  //   // test get course by id
  //   const courseData1 = await courseController.findCourseById(course1.id);
  //   console.log(
  //     "Course ID: " + courseData1.id,
  //     JSON.stringify(courseData1, null, 4)
  //   );

  //   // test get category by id
  //   const categoryData2 = await categoryController.findCategoryById(category2.id);
  //   console.log(
  //     "Category ID: " + categoryData2.id,
  //     JSON.stringify(categoryData2, null, 4)
  //   );
};

model.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log(">> Drop and re-sync the database...");
    run();
  });

const model = require("../models");
const Category = model.categories;

// create new category
exports.createCategory = (category) => {
  return Category.create({
    title: category.title,
    description: category.description,
  })
    .then((category) => {
      console.log(">> Creating category: " + JSON.stringify(category, null, 4));
      return category;
    })
    .catch((err) => {
      console.log(">> Error while creating category: ", err);
    });
};

// find all categories
exports.findAllCategories = () => {
  return Category.findAll({
    include: ["courses"],
  })
    .then((category) => {
      return category;
    })
    .catch((err) => {
      console.log(">> Error while finding all category: ", err);
    });
};

// find category by id
exports.findCategoryById = (categoryId) => {
  return Category.findByPk(categoryId, { include: ["courses"] })
    .then((category) => {
      return category;
    })
    .catch((err) => {
      console.log(">> Error while finding category: ", err);
    });
};

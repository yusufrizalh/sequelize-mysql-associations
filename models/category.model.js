module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("categories", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return Category;
};

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// mendaftarkan seluruh models
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);

/*
    # Table Relationship: pada Sequelize dikenal dg Association
      > one to one
      > one to many
      > many to many
    # Asumsi one to many
      > satu course memiliki satu category
      > satu category bisa dimiliki oleh banyak course
    # Asumsi many to many
      > satu course memiliki banyak tags
      > satu tag memiliki banyak courses
      > banyak courses bisa memiliki banyak tags
*/

// membuat relasi one to many
db.categories.hasMany(db.courses, { as: "courses" });
db.courses.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});

// membuat relasi many to many
db.courses.belongsToMany(db.tags, {
  through: "course_tag",
  as: "tags",
  foreignKey: "course_id",
});

db.tags.belongsToMany(db.courses, {
  through: "course_tag",
  as: "courses",
  foreignKey: "tag_id",
});

module.exports = db;

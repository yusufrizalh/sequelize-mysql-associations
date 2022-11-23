module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("courses", {
    /*
        # Sequelize: ORM khusus database SQL
          > default: sudah membuat kolom id dan createdAt
    */
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return Course;
};

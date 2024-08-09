// server/models/Content.js
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
    {
      section: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      buttonText: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      tableName: "content",
    }
  );

  return Content;
};

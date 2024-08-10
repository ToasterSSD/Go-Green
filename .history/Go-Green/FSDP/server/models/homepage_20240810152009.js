// server/models/Homepage.js
module.exports = (sequelize, DataTypes) => {
  const Homepage = sequelize.define(
    "Homepage",
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
      imageFile: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      tableName: "homepage",
    }
  );

  Homepage.associate = (models) => {
    Homepage.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Homepage;
};

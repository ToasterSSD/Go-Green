module.exports = (sequelize, DataTypes) => {
  const announcement = sequelize.define(
    "announcement",
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkURL: {
        type: DataTypes.STRING(200),
      },
      linkText: {
        type: DataTypes.STRING(200),
      }
    },
    {
      tableName: "announcement",
    }
  );

  announcement.associate = (models) => {
    announcement.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return announcement;
};

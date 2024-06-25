module.exports = (sequelize, DataTypes) => {
  const announcement = sequelize.define(
    "announcement",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkURL: {
        type: DataTypes.STRING(20),
      },
    },
    {
      tableName: "announcements",
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

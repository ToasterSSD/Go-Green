module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkL: {
        type: DataTypes.STRING(200),
      },
      linkText: {
        type: DataTypes.STRING(200),
      },
      imageFile: {
        type: DataTypes.STRING(20),
      },
    },
    {
      tableName: "announcement",
    }
  );

  Announcement.associate = (models) => {
    Announcement.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Announcement;
};

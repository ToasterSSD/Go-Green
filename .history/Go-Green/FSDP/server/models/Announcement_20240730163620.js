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
      link: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      linkText: {
        type: DataTypes.STRING(200),
      },
      imageFile: {
        type: DataTypes.STRING(20),
      },
      // In your Sequelize model definition
      signUpButton: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
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
